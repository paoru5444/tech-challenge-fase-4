import { Redirect } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";
import OnboardingScreen from "../screens/onboarding/screens/onboarding";
import { useAppSelector } from "../store/hooks";
import {
  isSignInProgress,
  selectIsAuthenticated,
} from "../modules/auth/store/selectors";

export default function Index() {
  const loading = useAppSelector(isSignInProgress);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (loading) {
    return <ActivityIndicator />;
  }

  if (isAuthenticated) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return <OnboardingScreen />;
}
