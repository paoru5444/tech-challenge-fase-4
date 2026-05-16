import React, { lazy, Suspense } from "react";
import { useSignIn } from "../hooks/useSignIn";
import { Loading } from "@/src/components/shared/loading";

const SignIn = lazy(() => import("../components/sign-in"));

export default function SignInScreen() {
  const { signIn, loading, goToSignUp, control, handleSubmit, errors } =
    useSignIn();

  return (
    <Suspense fallback={<Loading />}>
      <SignIn
        control={control}
        handleSubmit={handleSubmit}
        errors={errors}
        isLoading={loading}
        onSignIn={signIn}
        goToSignUp={goToSignUp}
      />
    </Suspense>
  );
}
