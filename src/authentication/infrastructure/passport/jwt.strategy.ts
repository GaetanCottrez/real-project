import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../../../users/application/users.service';
import { AuthentificationService } from '../../application/authentification.service';
import { AbilitiesService } from '../abilities/abilities.service';

ConfigModule.forRoot();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly authentificationService: AuthentificationService,
    private readonly abilitiesService: AbilitiesService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET
    });
  }

  async validate(payload: any) {
    const findUser = await this.usersService.getUserByUsername(payload.username);

    if (findUser) {
      if (
        bcrypt.compare(
          this.authentificationService.hashSub(
            findUser.id,
            payload.username,
            payload.role
          ),
          payload.sub
        )
      ) {
        return {
          data: findUser,
          abilities: await this.abilitiesService.defineAbilityFor(findUser)
        };
      } else {
        throw new UnauthorizedException(
          "Invalid token : content token incorect"
        );
      }
    } else {
      throw new UnauthorizedException("Invalid token : user not found!");
    }
  }
}
