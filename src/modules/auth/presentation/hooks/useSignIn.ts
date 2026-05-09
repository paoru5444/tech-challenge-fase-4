import { router } from "expo-router";
import { container } from "../../di/container";
import { IUserCredentials } from "../../domain/entities/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/src/schemas/auth-schema";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import * as actions from "../../store/actions";
import { isSignInProgress } from "../../store/selectors";

export interface SignInForm {
  email: string;
  password: string;
}

export function useSignIn() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(isSignInProgress);

  async function signIn(credentials: IUserCredentials) {
    try {
      const result = await dispatch(actions.signIn(credentials));

      if (actions.signIn.fulfilled.match(result)) {
        router.replace("/(app)/(tabs)");
      }
    } catch (error) {
      console.log("Sign In Error:", error);
    }
  }

  function goToSignUp() {
    router.push("/sign-up");
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return {
    signIn,
    goToSignUp,
    loading,
    control,
    handleSubmit,
    errors,
  };
}
