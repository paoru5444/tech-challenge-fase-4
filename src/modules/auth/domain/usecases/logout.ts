import { IUserRepository } from "../repositories/user-repository";

export class Logout {
  constructor(private repository: IUserRepository) {}

  async execute() {
    await this.repository.logout();
  }
}
