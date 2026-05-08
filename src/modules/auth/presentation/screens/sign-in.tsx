import React from "react";
import SignIn from "../components/sign-in";
import { useSignIn } from "../hooks/useSignIn";

export default function SignInScreen() {
  const { signIn, loading, goToSignUp, control, handleSubmit, errors } =
    useSignIn();

  return (
    <SignIn
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      isLoading={loading}
      onSignIn={signIn}
      goToSignUp={goToSignUp}
    />
  );
}
