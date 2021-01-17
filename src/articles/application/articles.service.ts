import { Inject, Injectable } from '@nestjs/common';
import { DomainError } from '../../shared/domain/domain-error';
import { IArticlesRepository } from '../domain/repositories/articles-repository';
import { Article } from '../domain/models/article';
import { ArticleDto } from '../domain/data-transfer-objects/article-dto';

@Injectable()
export class ArticlesService implements IArticlesRepository {
  constructor(
    @Inject('IArticlesRepository')
    private readonly articlesRepository: IArticlesRepository,
  ) {}

  async getArticles(filters: object = {}): Promise<Article[]> {
    return await this.articlesRepository.getArticles(filters);
  }

  async getArticleById(id: string): Promise<Article> {
    const article = await this.articlesRepository.getArticleById(id);
    if (!article) {
      throw new DomainError(`The article with id ${id} don't exists.`);
    }
    return article;
  }

  articleView(article: Article): ArticleDto {
    return article.asDTO();
  }
}
