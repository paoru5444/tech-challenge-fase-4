import { IUserCredentials } from "../entities/user";
import { IUserRepository } from "../repositories/user-repository";

export class SignIn {
  constructor(private repository: IUserRepository) {}

  async execute(credentials: IUserCredentials) {
    await this.repository.signIn(credentials);
  }
}
