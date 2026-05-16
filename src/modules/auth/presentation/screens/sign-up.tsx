import React, { lazy, Suspense } from "react";
import { useSignUp } from "../hooks/useSignUp";
import { Loading } from "@/src/components/shared/loading";

const SignUp = lazy(() => import("../components/sign-up"));

export default function SignUpScreen() {
  const { signUp, loading, goToSignIn, control, errors, handleSubmit } =
    useSignUp();

  return (
    <Suspense fallback={<Loading />}>
      <SignUp
        control={control}
        errors={errors}
        goToSignIn={goToSignIn}
        handleSubmit={handleSubmit}
        isLoading={loading}
        onSignUp={signUp}
      />
    </Suspense>
  );
}
