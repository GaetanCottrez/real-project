import { UserMail } from "../../users/domain/value-objects/usermail";
import { User } from "../../users/domain/models/user";
import { UserDto } from "../../users/domain/data-transfer-objects/user-dto";
import { UserPassword } from '../../users/domain/value-objects/userpassword';

export class createInstanceService {
  static user(user: UserDto): User | null {
    return user && user.id
      ? new User(
        user.id,
        user.external_id,
        user.username,
        user.password,
        user.firstName,
        user.lastName,
        user.displayName,
        new UserMail(user.email),
        user.role,
        user.accounts
      )
      : null;
  }
}
