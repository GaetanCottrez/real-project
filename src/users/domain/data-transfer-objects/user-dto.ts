import { RoleEnum, typeAccountUser } from '../../../interfaces/user.interface';

export class UserDto {
  readonly id: string;

  readonly external_id: number;

  readonly username: string;

  readonly password: string;

  readonly firstName: string;

  readonly displayName: string;

  readonly lastName: string;

  readonly email: string;

  readonly accounts?: typeAccountUser[];

  readonly role: RoleEnum;
}
