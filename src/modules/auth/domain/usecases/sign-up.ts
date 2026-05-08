import { IUser, IUserCredentials, validatePassword } from "../entities/user";
import { IUserRepository } from "../repositories/user-repository";

export class SignUp {
  constructor(private repository: IUserRepository) {}

  async execute(credentials: IUserCredentials): Promise<IUser | void> {
    const isPasswordsValid = validatePassword(credentials);

    if (isPasswordsValid) {
      return await this.repository.signUp(credentials);
    } else {
      throw new Error("Passwords must be the same.");
    }
  }
}
