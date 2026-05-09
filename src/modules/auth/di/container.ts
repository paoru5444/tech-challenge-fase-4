import { FirebaseAuth } from "../data/remote/firebase-auth";
import { UserRepositoryImpl } from "../domain/repositories/user-repository-impl";

import { Logout } from "../domain/usecases/logout";
import { SignIn } from "../domain/usecases/sign-in";
import { SignUp } from "../domain/usecases/sign-up";

const remote = new FirebaseAuth();
const repository = new UserRepositoryImpl(remote);

export const container = {
  signIn: new SignIn(repository),
  signUp: new SignUp(repository),
  logout: new Logout(repository),
};
