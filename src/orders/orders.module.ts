import { HttpModule, Module } from '@nestjs/common';
import { OrdersService } from './application/orders.service';
import { OrdersController } from './infrastructure/orders.controller';
import { MongodbOrdersRepository } from './infrastructure/repositories/mongodb-orders.repository';
import { UsersService } from '../users/application/users.service';
import { CustomersService } from '../customers/application/customers.service';
import { ArticlesService } from '../articles/application/articles.service';
import { MongodbCustomersRepository } from '../customers/infrastructure/repositories/mongodb-customers.repository';
import { MongodbUsersRepository } from '../users/infrastructure/repositories/mongodb-users.repository';
import { MongodbArticlesRepository } from '../articles/infrastructure/repositories/mongodb-articles.repository';

@Module({
  imports: [HttpModule],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    UsersService,
    CustomersService,
    ArticlesService,
    {
      provide: 'OrdersService',
      useClass: OrdersService,
    },
    {
      provide: 'ICustomersRepository',
      useFactory: () => {
        return new MongodbCustomersRepository();
      },
    },
    {
      provide: 'IArticlesRepository',
      useFactory: () => {
        return new MongodbArticlesRepository();
      },
    },
    {
      provide: 'IUsersRepository',
      useFactory: () => {
        return new MongodbUsersRepository();
      },
    },
    {
      provide: 'IOrdersRepository',
      useFactory: () => {
        return new MongodbOrdersRepository(
          null,
          new UsersService(new MongodbUsersRepository()),
          new CustomersService(new MongodbCustomersRepository()),
          new ArticlesService(new MongodbArticlesRepository()),
        );
      },
    },
  ],
})
export class OrdersModule {}
