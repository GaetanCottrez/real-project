import { typeAccountUserEnum } from '../../../interfaces/user.interface';

export class typeAccountUserDto {
  readonly externalId: number;

  readonly firstName: string;

  readonly displayName: string;

  readonly lastName: string;

  readonly type: typeAccountUserEnum;
}
