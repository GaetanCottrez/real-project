import { Injectable } from '@nestjs/common';
import MongoDbRepository from '../../../database/mongodb/MongoDbRepository.repository';
import { createInstanceService } from '../../../shared/application/createInstance.service';
import { IArticlesRepository } from '../../domain/repositories/articles-repository';
import { ArticleDto } from '../../domain/data-transfer-objects/article-dto';
import { Article } from '../../domain/models/article';
import { ArticleCategoryDto } from '../../domain/data-transfer-objects/article-category-dto';
import { ArticleCategory } from '../../domain/models/articleCategory';
import { ObjectID } from 'mongodb';

@Injectable()
export class MongodbArticlesRepository implements IArticlesRepository {
  private mongoClient = new MongoDbRepository();
  private nameCollection = 'Articles';

  constructor(db = null) {
    if (db != null) {
      this.mongoClient.database = db;
    }
  }

  convertExceptionsOrCategoriesFromDatabase(
    exceptionsOrCategories: any,
  ): ArticleCategory[] {
    const arrayInstanceExceptionsOrCategories: ArticleCategory[] = [];
    exceptionsOrCategories.forEach(exceptionOrCategory => {
      arrayInstanceExceptionsOrCategories.push(
        createInstanceService.articleCategory({
          reference: exceptionOrCategory.ar_ref,
          category: exceptionOrCategory.ac_categorie,
          priceSell: exceptionOrCategory.ac_prixven,
          referenceCustomer: exceptionOrCategory.ct_num,
        } as ArticleCategoryDto),
      );
    });
    return arrayInstanceExceptionsOrCategories;
  }

  async fromDatabase(article: any): Promise<Article> {
    return createInstanceService.article({
      id: article._id,
      reference: article.dl_ref,
      description: article.dl_design,
      familyCode: article.dl_codefamille,
      warranty: article.dl_garantie,
      weightUnit: article.dl_unitepoids,
      weight: article.dl_unitepoids,
      weightNet: article.dl_poidsnet,
      weightGross: article.dl_poidsbrut,
      priceBuy: article.dl_prixach,
      priceSell: article.dl_prixven,
      priceIncludedTaxes: article.dl_prixttc,
      statusLine1: article.dl_stat01,
      statusLine2: article.dl_stat02,
      barcode: article.dl_codebarre,
      country: article.dl_pays,
      categories: this.convertExceptionsOrCategoriesFromDatabase(
        article.categories,
      ),
      exceptions: this.convertExceptionsOrCategoriesFromDatabase(
        article.exceptions,
      ),
    } as ArticleDto);
  }

  async getArticles(match: object = {}): Promise<Article[]> {
    return await this.find(match);
  }

  async getArticleById(id: string): Promise<Article> {
    return await this.findOne({ _id : new ObjectID(id) });
  }

  private async find(match: object) {
    let pipeline: Array<any> = [
      {
        $match: match,
      },
      {
        $project: {
          _id: 1,
          id: 1,
          dl_ref: 1,
          dl_design: 1,
          dl_codefamille: 1,
          dl_garantie: 1,
          dl_unitepoids: 1,
          dl_poidsnet: 1,
          dl_poidsbrut: 1,
          dl_prixach: 1,
          dl_prixven: 1,
          dl_prixttc: 1,
          dl_stat01: 1,
          dl_stat02: 1,
          dl_codebarre: 1,
          dl_pays: 1,
          categories: 1,
          exceptions: 1,
        },
      },
    ];

    const articles = await this.mongoClient.database
      .collection(this.nameCollection)
      .aggregate(pipeline)
      .toArray();
    const articlesFormatted: Article[] = [];
    for (const article of articles) {
      articlesFormatted.push(await this.fromDatabase(article));
    }
    return articlesFormatted;
  }

  private async findOne(match: object): Promise<Article> | null {
    const articles = await this.find(match);

    if (articles.length > 0) {
      return articles[0];
    } else {
      return null;
    }
  }
}
