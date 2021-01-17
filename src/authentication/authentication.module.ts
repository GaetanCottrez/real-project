import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthenticationController } from './infrastructure/authentication.controller';
import { MongodbUsersRepository } from '../users/infrastructure/repositories/mongodb-users.repository';
import { JwtStrategy } from './infrastructure/passport/jwt.strategy';
import { AuthentificationService } from './application/authentification.service';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from '../users/application/users.service';
import { AbilitiesService } from './infrastructure/abilities/abilities.service';
import { LocalStrategy } from './infrastructure/passport/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: undefined, session: true }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" }
    })
  ],
  controllers: [AuthenticationController],
  providers: [
    {
      provide: "IUsersRepository",
      useFactory: () => {
        return new MongodbUsersRepository();
      }
    },
    {
      provide: "AuthentificationService",
      useClass: AuthentificationService
    },
    {
      provide: "UsersService",
      useClass: UsersService
    },
    {
      provide: "AbilitiesService",
      useClass: AbilitiesService
    },
    LocalStrategy,
    JwtStrategy
  ],
  exports: [AuthentificationService, LocalStrategy, PassportModule]
})
export class AuthenticationModule {
}
