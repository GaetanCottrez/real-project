import { Injectable, Inject } from "@nestjs/common";
import { IUsersRepository } from "../domain/repositories/users-repository";
import { User } from "../domain/models/user";
import { DomainError } from "../../shared/domain/domain-error";
import { UserDto } from "../domain/data-transfer-objects/user-dto";
import { RoleEnum } from "../../interfaces/user.interface";

@Injectable()
export class UsersService implements IUsersRepository {
  constructor(
    @Inject("IUsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {
  }

  async save(user: User): Promise<void> {
    await this.usersRepository.save(user);
  }

  async createUser(user: User): Promise<void> {
    if (await this.usersRepository.getUserByUsername(user.username)) {
      throw new DomainError(`The user with id ${user.username} already exists.`);
    }
    await this.save(user);
  }

  async updateUser(user: User): Promise<void> {
    if (await this.usersRepository.getUserById(user.id)) {
      await this.save(user);
    } else {
      throw new DomainError(`The user with id ${user.id} not found.`);
    }
  }

  async getUsers(filters: object = {}): Promise<User[]> {
    return await this.usersRepository.getUsers(filters);
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.getUserById(id);
    if (!user) {
      throw new DomainError(`The user with id ${id} don't exists.`);
    }
    return user;
  }

  async getUserByUsername(username: string): Promise<User> | null {
    return await this.usersRepository.getUserByUsername(username);
  }

  async userView(user: User): Promise<UserDto> {
    return await this.usersRepository.userView(user);
  }

  async patchRole(idUser: string, role: RoleEnum): Promise<User> {
    const userInstance = await this.getUserById(idUser);
    userInstance.changeRole(role);
    await this.save(userInstance);
    return userInstance;
  }
}
