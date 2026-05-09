import { container } from "../../di/container";
import { IUserCredentials } from "../../domain/entities/user";
import { router } from "expo-router";
import { signUpSchema } from "@/src/schemas/auth-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import { isSignUpInProgress } from "../../store/selectors";
import * as actions from "../../store/actions";

interface SignUpForm {
  email: string;
  password: string;
  passwordConfirm: string;
}

export function useSignUp() {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(isSignUpInProgress);

  function goToSignIn() {
    router.push("/sign-in");
  }

  async function signUp(credentials: IUserCredentials) {
    try {
      const result = await dispatch(actions.signUp(credentials));

      if (actions.signIn.fulfilled.match(result)) {
        router.replace("/(app)/(tabs)");
      }
    } catch (error) {
      console.log("Sign Up Error:", error);
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
