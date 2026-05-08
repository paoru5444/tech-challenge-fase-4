import { FirebaseAuth } from "../../data/remote/firebase-auth";
import { IUser, IUserCredentials } from "../../domain/entities/user";
import { IUserRepository } from "../../domain/repositories/user-repository";

export class UserRepositoryImpl implements IUserRepository {
  constructor(private remote: FirebaseAuth) {}

  async signIn(credentials: IUserCredentials): Promise<IUser> {
    return await this.remote.signIn(credentials);
  }

  async signUp(credentials: IUserCredentials): Promise<IUser> {
    return await this.remote.signUp(credentials);
  }

  async logout(): Promise<void> {
    await this.remote.logout();
  }
}
