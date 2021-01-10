import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { Module } from "@nestjs/common";
import { HttpErrorFilter } from "./shared/infrastructure/filters/http-error.filter";
import { LoggingInterceptor } from "./shared/infrastructure/interceptors/logging.interceptor";
import { UsersModule } from "./users/users.module";
import { AuthenticationModule } from "./authentication/authentication.module";
import { ArticlesModule } from './articles/users.module';

@Module({
  imports: [
    AuthenticationModule,
    ArticlesModule,
    UsersModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
  exports: [],
  controllers: []
})
export class ApiModule {}
