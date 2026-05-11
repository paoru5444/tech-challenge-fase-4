import React from "react";
import { useOnboarding } from "../hooks/useOnboarding";
import Onboarding from "../components/onboarding";

export default function OnboardingScreen() {
  const { goToSignIn } = useOnboarding();

  return <Onboarding onPressGettingStarted={goToSignIn} />;
}
