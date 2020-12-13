import { User } from "../models/user";
import { UserDto } from "../data-transfer-objects/user-dto";

export interface IUsersRepository {
  getUserById(id: string): Promise<User> | null;

  getUserByUsername(username: string): Promise<User>;

  getUsers(match: object): Promise<User[]>;

  save(user: User): Promise<void>;

  userView(user: User): Promise<UserDto>;
}
