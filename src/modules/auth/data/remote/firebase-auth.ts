import {
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { IUser, IUserCredentials } from "../../domain/entities/user";
import { auth } from "@/src/firebase/config";

function toSerializableUser(user: User): IUser {
  return {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    isAnonymous: user.isAnonymous,
    providerId: user.providerId,
    tenantId: user.tenantId,
  };
}

export class FirebaseAuth {
  async signIn({ email, password }: IUserCredentials): Promise<IUser> {
    const res = await signInWithEmailAndPassword(auth, email, password);
    return toSerializableUser(res.user);
  }

  async signUp({ email, password }: IUserCredentials) {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return toSerializableUser(res.user);
  }

  async logout() {
    await auth.signOut();
  }
}
