import { IUser, IUserCredentials } from "../entities/user";

export interface IUserRepository {
  signIn(credentials: IUserCredentials): Promise<IUser>;
  signUp(credentials: IUserCredentials): Promise<IUser>;
  logout(): Promise<void>;
}
