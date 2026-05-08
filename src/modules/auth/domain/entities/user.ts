import { User } from "firebase/auth";

export interface IUser extends User {}

export interface IUserCredentials {
  email: string;
  password: string;
  passwordConfirm?: string;
}

export function validatePassword({
  password,
  passwordConfirm,
}: IUserCredentials) {
  return password === passwordConfirm;
}
