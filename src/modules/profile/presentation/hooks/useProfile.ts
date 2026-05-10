import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import * as actions from "@/src/modules/auth/store/actions";
import { selectUser } from "@/src/modules/auth/store/selectors";
import { router } from "expo-router";

export function useProfile() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  const logout = () => {
    dispatch(actions.logout());
    router.replace("/sign-in");
  };

  return {
    logout,
    user,
  };
}
