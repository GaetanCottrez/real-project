import { DomainError } from '../../../shared/domain/domain-error';
import * as bcrypt from 'bcrypt';

const PASSWORD_RE = new RegExp('(?=^.{8,}$)(?=.*\\d)(?=.*[!@#$%^&*]+)(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$');
const BCRYPT_PATTERN = new RegExp('^\\$2[ayb]\\$.{56}$');

export class UserPassword {

  constructor(readonly value: string) {
    this.ensureValidFormat(value);
  }

  private ensureValidFormat(value: string) {
    if (!value.match(PASSWORD_RE)) {
      throw new DomainError('Invalid user password, the password must contains uppercase characters, lowercase characters, numeric characters and special characters, and a length of 8 characters.');
    }
  }

  static hashPassword(value: string) {
    if (!value.match(BCRYPT_PATTERN)) {
      return bcrypt.hashSync(value, bcrypt.genSaltSync(10))
    }
  }
}
