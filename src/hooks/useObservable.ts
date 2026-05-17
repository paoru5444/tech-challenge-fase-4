import { useEffect, useState, useRef } from "react";
import { Observable, Subscription } from "rxjs";

export function useObservable<T>(
  observable$: Observable<T>,
  initialValue: T,
): T {
  const [value, setValue] = useState<T>(initialValue);
  const subRef = useRef<Subscription>(null);

  useEffect(() => {
    subRef.current = observable$.subscribe(setValue);
    return () => subRef.current?.unsubscribe();
  }, [observable$]);

  return value;
}
