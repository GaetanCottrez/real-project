import { HttpModule, Module } from '@nestjs/common';
import { ArticlesService } from './application/articles.service';
import { ArticlesController } from './infrastructure/articles.controller';
import { MongodbArticlesRepository } from './infrastructure/repositories/mongodb-articles.repository';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [ArticlesController],
  providers: [
    {
      provide: "ArticlesService",
      useClass: ArticlesService
    },
    {
      provide: "IArticlesRepository",
      useFactory: () => {
        return new MongodbArticlesRepository();
      }
    }
  ]
})
export class ArticlesModule {
}
