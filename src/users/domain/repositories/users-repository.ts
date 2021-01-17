import { User } from '../models/user';
import { UserDto } from '../data-transfer-objects/user-dto';
import { typeAccountUser } from '../models/typeAccountUser';

export interface IUsersRepository {
  getUserById(id: string): Promise<User> | null;

  getUserByUsername(username: string): Promise<User>;

  getUserByExternalId(externalId: number): Promise<User>;

  getTypeAccountUserByExternalId(externalId: number): Promise<typeAccountUser[]>;

  getUsers(match: object): Promise<User[]>;

  save(user: UserDto): Promise<void>;
}
