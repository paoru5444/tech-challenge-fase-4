import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { IUser, IUserCredentials } from "../domain/entities/user";
import { auth } from "@/src/firebase/config";

export class FirebaseAuth {
  async signIn({ email, password }: IUserCredentials): Promise<IUser> {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user;
  }

  async signUp({ email, password }: IUserCredentials) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user;
  }

  async logout() {
    auth.signOut();
  }
}
