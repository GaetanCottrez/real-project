import { Article } from '../models/article';

export interface IArticlesRepository {
  getArticleById(id: string): Promise<Article> | null;

  getArticles(match: object): Promise<Article[]>;
}
