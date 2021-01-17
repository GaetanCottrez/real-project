import { HttpModule, Module } from '@nestjs/common';
import { CustomersService } from './application/customers.service';
import { CustomersController } from './infrastructure/customers.controller';
import { MongodbCustomersRepository } from './infrastructure/repositories/mongodb-customers.repository';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [CustomersController],
  providers: [
    {
      provide: "CustomersService",
      useClass: CustomersService
    },
    {
      provide: "ICustomersRepository",
      useFactory: () => {
        return new MongodbCustomersRepository();
      }
    }
  ]
})
export class CustomersModule {
}
