import { v4 as uuid } from 'uuid';
import { UserDto } from '../data-transfer-objects/user-dto';
import { IUser, RoleEnum } from '../../../interfaces/user.interface';
import { UserMail } from '../value-objects/usermail';
import { UserPassword } from '../value-objects/userpassword';
import { ChangeDetailsUserDto } from '../data-transfer-objects/change-details-user-dto';
import { typeAccountUser } from './typeAccountUser';

export class User implements IUser {
  private _id: string;
  private _externalId: number;
  private _username: string;
  private _password: string;
  private _displayName: string;
  private _firstName: string;
  private _lastName: string;
  private _email: UserMail;
  private _role: RoleEnum;
  private _accounts: typeAccountUser[]
  private _archived?: boolean;
  private _trash?: boolean;

  constructor(
    id: string,
    externalId: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    displayName: string,
    email: UserMail,
    role: RoleEnum,
    accounts: typeAccountUser[]
  ) {
    this._id = id;
    this._externalId = externalId;
    this._username = username;
    this._firstName = firstName;
    this._lastName = lastName;
    this._displayName = displayName;
    this._email = email;
    this._role = role;
    this._password = password;
    this._accounts = accounts;
  }

  public get id(): string {
    return this._id;
  }

  public get externalId(): number {
    return this._externalId;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get username(): string {
    return this._username;
  }

  public get password(): string {
    return this._password;
  }

  public get lastName(): string {
    return this._lastName;
  }

  public get email(): UserMail {
    return this._email;
  }

  public get role(): RoleEnum {
    return this._role;
  }

  public get accounts(): typeAccountUser[] {
    return this._accounts;
  }

  public get archived(): boolean {
    return this._archived;
  }

  public get trash(): boolean {
    return this._trash;
  }

  public get displayName(): string {
    return this._firstName !== '' && this._lastName !== ''
      ? `${this._firstName} ${this._lastName}`
      : this._displayName;
  }

  asDTO(): UserDto {
    return {
      id: this._id,
      externalId: this._externalId,
      username: this._username,
      password: this._password,
      firstName: this._firstName,
      lastName: this._lastName,
      displayName: this._displayName,
      email: this._email.value,
      accounts: this._accounts,
      role: this._role,
    } as UserDto;
  }

  asDTOWithoutPassword(): UserDto {
    return {
      id: this._id,
      externalId: this._externalId,
      username: this._username,
      firstName: this._firstName,
      lastName: this._lastName,
      displayName: this._displayName,
      email: this._email.value,
      accounts: this._accounts,
      role: this._role,
    } as UserDto;
  }

  changeRole(role: RoleEnum) {
    if (role) {
      this._role = role;
    }
  }

  changeAccount(accounts: typeAccountUser[]) {
    if (accounts.length > 0 && this._accounts.length === 0) {
      this._accounts = accounts;
    }
  }

  changePassword(newPassword : string): void {
    const instanceNewPassword = new UserPassword(newPassword)
    this._password = instanceNewPassword.value
  }

  changeDetails(patch: ChangeDetailsUserDto): void {
    if (patch.firstName) {
      this._firstName = patch.firstName;
    }

    if (patch.lastName) {
      this._lastName = patch.lastName;
    }

    if (patch.displayName) {
      this._displayName = patch.displayName;
    }

    if (patch.email) {
      this._email = new UserMail(patch.email);
    }
  }

  static create(user: UserDto): User {
    const instanceUserPassword = new UserPassword(user.password)
    return new User(
      uuid(),
      user.externalId,
      user.username,
      UserPassword.hashPassword(instanceUserPassword.value),
      user.firstName,
      user.lastName,
      user.displayName,
      new UserMail(user.email),
      user.role,
      []
    );
  }
}
