import { useState } from "react";
import { container } from "../../di/container";
import { IUserCredentials } from "../../domain/entities/user";
import { router } from "expo-router";
import { signUpSchema } from "@/src/schemas/auth-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface SignUpForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

export function useSignUp() {
  const [loading, setLoading] = useState(false);

  function goToSignIn() {
    router.push("/app/sign-in");
  }

  async function signUp(credentials: IUserCredentials) {
    try {
      setLoading(true);
      const user = await container.signUp.execute(credentials);
      setLoading(false);
    } catch (error) {
      console.log("Sign Up Error:", error);
      setLoading(false);
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return {
    signUp,
    loading,
    goToSignIn,
    control,
    handleSubmit,
    errors,
  };
}
