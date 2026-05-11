import { router } from "expo-router";

export function useOnboarding() {
  const goToSignIn = () => {
    router.push("/sign-in");
  };

  return {
    goToSignIn,
  };
}
