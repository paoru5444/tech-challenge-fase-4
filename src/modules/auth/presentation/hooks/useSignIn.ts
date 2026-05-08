import { router } from "expo-router";
import { container } from "../../di/container";
import { IUserCredentials } from "../../domain/entities/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/src/schemas/auth-schema";

export interface SignInForm {
  email: string;
  password: string;
}

export function useSignIn() {
  const [loading, setLoading] = useState(false);

  async function signIn(credentials: IUserCredentials) {
    try {
      setLoading(true);
      const user = await container.signIn.execute(credentials);

      setLoading(false);
    } catch (error) {
      console.log("Sign In Error:", error);
      setLoading(false);
    }
  }

  function goToSignUp() {
    router.push("/app/sign-up");
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
