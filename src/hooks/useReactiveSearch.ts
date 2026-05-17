// hooks/reactive/useReactiveSearch.ts
import { useMemo, useCallback } from "react";
import {
  Subject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  startWith,
  catchError,
  of,
  merge,
} from "rxjs";
import { useObservable } from "./useObservable";

interface SearchState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

export function useReactiveSearch<T>(
  fetcher: (query: string) => Promise<T[]>,
  debounceMs = 350,
  minChars = 2,
) {
  const query$ = useMemo(() => new Subject<string>(), []);

  const state$ = useMemo(
    () =>
      query$.pipe(
        debounceTime(debounceMs),
        distinctUntilChanged(),
        switchMap((query) => {
          if (query.trim().length < minChars) {
            return of<SearchState<T>>({
              data: [],
              loading: false,
              error: null,
            });
          }

          const loading$ = of<SearchState<T>>({
            data: [],
            loading: true,
            error: null,
          });
          const result$ = new Observable<T[]>((sub) => {
            fetcher(query)
              .then((r) => {
                sub.next(r);
                sub.complete();
              })
              .catch((e) => sub.error(e));
          }).pipe(
            map(
              (data) =>
                ({ data, loading: false, error: null }) as SearchState<T>,
            ),
            catchError((err) =>
              of<SearchState<T>>({
                data: [],
                loading: false,
                error: err.message,
              }),
            ),
          );

          return merge(loading$, result$);
        }),
        startWith<SearchState<T>>({ data: [], loading: false, error: null }),
      ),
    [query$, fetcher, debounceMs, minChars],
  );

  const state = useObservable(state$, {
    data: [],
    loading: false,
    error: null,
  });
  const search = useCallback((q: string) => query$.next(q), [query$]);

  return { ...state, search };
}
