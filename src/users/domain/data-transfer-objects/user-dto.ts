import { RoleEnum } from '../../../interfaces/user.interface';
import { typeAccountUser } from '../models/typeAccountUser';

export class UserDto {
  readonly id: string;

  readonly externalId: number;

  readonly username: string;

  readonly password?: string;

  readonly firstName: string;

  readonly displayName: string;

  readonly lastName: string;

  readonly email: string;

  public accounts?: typeAccountUser[];

  readonly role: RoleEnum;
}
