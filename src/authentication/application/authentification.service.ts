import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/domain/models/user';
import { UsersService } from '../../users/application/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthentificationService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.getUserByUsername(username);
    if (user && await this.checkPassword(password, user.password)) {
      return user;
    }
    return null;
  }

  private async checkPassword(password: string, passwordHash: string): Promise<Boolean> {
    return await bcrypt.compare(password, passwordHash)
  }

  hashSub(id: any, username: any, role_name: any): any {
    return bcrypt.hashSync(
      `${id}|${username}|${role_name}`,
      bcrypt.genSaltSync(10)
    );
  }

  login(user: User) {
    const payload = {
      username: user.username,
      display_name: user.displayName,
      sub: this.hashSub(user.id, user.username, user.role),
      role: user.role
    };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
