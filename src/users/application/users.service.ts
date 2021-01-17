import { Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from '../domain/repositories/users-repository';
import { User } from '../domain/models/user';
import { DomainError } from '../../shared/domain/domain-error';
import { UserDto } from '../domain/data-transfer-objects/user-dto';
import { RoleEnum } from '../../interfaces/user.interface';
import { typeAccountUser } from '../domain/models/typeAccountUser';

@Injectable()
export class UsersService implements IUsersRepository {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {
  }

  async getTypeAccountUserByExternalId(externalId: number): Promise<typeAccountUser[]> {
    return await this.usersRepository.getTypeAccountUserByExternalId(externalId)
  }

  async save(user: UserDto): Promise<void> {
    await this.usersRepository.save(user);
  }

  async createUser(user: UserDto): Promise<UserDto> {
    const newUser = User.create(user);
    if (await this.usersRepository.getUserByUsername(newUser.username)) {
      throw new DomainError(`The user with the username ${newUser.username} already exists.`);
    }
    if (await this.usersRepository.getUserByExternalId(newUser.externalId)) {
      throw new DomainError(`The user with the externalId ${newUser.externalId} already exists.`);
    }

    newUser.changeAccount(await this.getTypeAccountUserByExternalId(newUser.externalId));

    await this.save(newUser.asDTO());

    return newUser.asDTOWithoutPassword();
  }

  async updateUser(user: User): Promise<void> {
    if (await this.usersRepository.getUserById(user.id)) {
      await this.save(user.asDTO());
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

  async getUserByExternalId(externalId: number): Promise<User> | null {
    return await this.usersRepository.getUserByExternalId(externalId);
  }

  userView(user: User): UserDto {
    return user.asDTOWithoutPassword();
  }

  async patchRole(idUser: string, role: RoleEnum): Promise<User> {
    const userInstance = await this.getUserById(idUser);
    userInstance.changeRole(role);
    await this.save(userInstance.asDTO());
    return userInstance;
  }
}
