import { ITypeAccountUser, typeAccountUserEnum } from '../../../interfaces/user.interface';
import { typeAccountUserDto } from '../data-transfer-objects/typeAccountUser-dto';

export class typeAccountUser implements ITypeAccountUser {
  private _externalId: number;
  private _displayName: string;
  private _firstName: string;
  private _lastName: string;
  private _type : typeAccountUserEnum

  constructor(
    externalId: number,
    firstName: string,
    lastName: string,
    displayName: string,
    type: typeAccountUserEnum
  ) {
    this._externalId = externalId;
    this._firstName = firstName;
    this._lastName = lastName;
    this._displayName = displayName;
    this._type = type;
  }

  public get externalId(): number {
    return this._externalId;
  }

  public get type(): typeAccountUserEnum {
    return this._type;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get displayName(): string {
    return this._firstName !== '' && this._lastName !== ''
      ? `${this._firstName} ${this._lastName}`
      : this._displayName;
  }

  asDTO(): typeAccountUserDto {
    return {
      externalId: this._externalId,
      firstName: this._firstName,
      lastName: this._lastName,
      displayName: this._displayName,
      type: this._type
    } as typeAccountUserDto;
  }

  static create(typeAccount: typeAccountUserDto): typeAccountUser {
    return new typeAccountUser(
      typeAccount.externalId,
      typeAccount.firstName,
      typeAccount.lastName,
      typeAccount.displayName,
      typeAccount.type
    );
  }
}
