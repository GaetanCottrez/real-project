import { IArticleCategory } from '../../../interfaces/article.interface';
import { ArticleCategoryDto } from '../data-transfer-objects/article-category-dto';

export class ArticleCategory implements IArticleCategory {
  private _reference: string;
  private _category: string;
  private _priceSell: number;
  private _referenceCustomer: string;

  constructor(
    reference: string,
    category: string,
    priceSell: number,
    referenceCustomer: string
  ) {
    this._reference = reference;
    this._category = category;
    this._priceSell = priceSell;
    this._referenceCustomer = referenceCustomer;
  }

  public get reference(): string {
    return this._reference;
  }

  public get category(): string {
    return this._category;
  }

  public get priceSell(): number {
    return this._priceSell;
  }

  public get referenceCustomer(): string {
    return this._referenceCustomer;
  }

  asDTO(): ArticleCategoryDto {
    return {
      reference: this._reference,
      category: this._category,
      priceSell: this._priceSell,
      referenceCustomer: this._referenceCustomer,
    } as ArticleCategoryDto;
  }

  static create(category: ArticleCategoryDto): ArticleCategory {
    return new ArticleCategory(
      category.reference,
      category.category,
      category.priceSell,
      category.referenceCustomer
    );
  }
}
