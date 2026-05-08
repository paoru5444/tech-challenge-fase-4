import React from "react";
import SignUp from "../components/sign-up";
import { useSignUp } from "../hooks/useSignUp";

export default function SignUpScreen() {
  const { signUp, loading, goToSignIn, control, errors, handleSubmit } =
    useSignUp();

  return (
    <SignUp
      control={control}
      errors={errors}
      goToSignIn={goToSignIn}
      handleSubmit={handleSubmit}
      isLoading={loading}
      onSignUp={signUp}
    />
  );
}
