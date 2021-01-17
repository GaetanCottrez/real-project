import { HttpModule, Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './infrastructure/users.controller';
import { MongodbUsersRepository } from './infrastructure/repositories/mongodb-users.repository';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [UsersController],
  providers: [
    {
      provide: "UsersService",
      useClass: UsersService
    },
    {
      provide: "IUsersRepository",
      useFactory: () => {
        return new MongodbUsersRepository();
      }
    }
  ]
})
export class UsersModule {
}
