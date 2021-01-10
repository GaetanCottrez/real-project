import { IArticle } from '../../../interfaces/article.interface';
import { ArticleDto } from '../data-transfer-objects/article-dto';
import { ArticleCategory } from './articleCategory';
import { ArticleCategoryDto } from '../data-transfer-objects/article-category-dto';

export class Article implements IArticle {
  private _id: string;
  private _reference: string;
  private _description: string;
  private _familyCode: string;
  private _warranty: number;
  private _weightUnit: number;
  private _weight: number;
  private _weightNet: number;
  private _weightGross: number;
  private _priceBuy: number;
  private _priceSell: number;
  private _priceIncludedTaxes: number;
  private _statusLine1: string;
  private _statusLine2: string;
  private _barcode: string;
  private _country: string;
  private _categories: ArticleCategory[];
  private _exceptions: ArticleCategory[];
  private _archived?: boolean;
  private _trash?: boolean;

  constructor(
    id: string,
    reference: string,
    description: string,
    familyCode: string,
    warranty: number,
    weightUnit: number,
    weight: number,
    weightNet: number,
    weightGross: number,
    priceBuy: number,
    priceSell: number,
    priceIncludedTaxes: number,
    statusLine1: string,
    statusLine2: string,
    barcode: string,
    country: string,
    categories: ArticleCategory[],
    exceptions: ArticleCategory[],
  ) {
    this._id = id;
    this._reference = reference;
    this._description = description;
    this._familyCode = familyCode;
    this._warranty = warranty;
    this._weightUnit = weightUnit;
    this._weight = weight;
    this._weightNet = weightNet;
    this._weightGross = weightGross;
    this._priceBuy = priceBuy;
    this._priceSell = priceSell;
    this._priceIncludedTaxes = priceIncludedTaxes;
    this._statusLine1 = statusLine1;
    this._statusLine2 = statusLine2;
    this._barcode = barcode;
    this._country = country;
    this._categories = categories;
    this._exceptions = exceptions;
  }

  public get id(): string {
    return this._id;
  }

  public get reference(): string {
    return this._reference;
  }

  public get description(): string {
    return this._description;
  }

  public get familyCode(): string {
    return this._familyCode;
  }

  public get warranty(): number {
    return this._warranty;
  }

  public get weightUnit(): number {
    return this._weightUnit;
  }

  public get weight(): number {
    return this._weight;
  }

  public get weightNet(): number {
    return this._weightNet;
  }

  public get weightGross(): number {
    return this._weightGross;
  }

  public get priceBuy(): number {
    return this._priceBuy;
  }

  public get priceSell(): number {
    return this._priceSell;
  }

  public get priceIncludedTaxes(): number {
    return this._priceIncludedTaxes;
  }

  public get statusLine1(): string {
    return this._statusLine1;
  }

  public get statusLine2(): string {
    return this._statusLine2;
  }

  public get barcode(): string {
    return this._barcode;
  }

  public get country(): string {
    return this._country;
  }

  public get categories(): ArticleCategory[] {
    return this._categories;
  }

  public get exceptions(): ArticleCategory[] {
    return this._exceptions;
  }

  public get archived(): boolean {
    return this._archived;
  }

  public get trash(): boolean {
    return this._trash;
  }

  articleCategoriesAsDto(
    articleCategories: ArticleCategory[],
  ): ArticleCategoryDto[] {
    const arrayArticleCategoriesDto: ArticleCategoryDto[] = [];

    articleCategories.forEach(articleCategory => {
      arrayArticleCategoriesDto.push(articleCategory.asDTO());
    });

    return arrayArticleCategoriesDto;
  }

  asDTO(): ArticleDto {
    return {
      id: this._id,
      reference: this._reference,
      description: this._description,
      familyCode: this._familyCode,
      warranty: this._warranty,
      weightUnit: this._weightUnit,
      weight: this._weight,
      weightNet: this._weightNet,
      weightGross: this._weightGross,
      priceBuy: this._priceBuy,
      priceSell: this._priceSell,
      priceIncludedTaxes: this._priceIncludedTaxes,
      statusLine1: this._statusLine1,
      statusLine2: this._statusLine2,
      barcode: this._barcode,
      country: this._country,
      categories: this.articleCategoriesAsDto(this._categories),
      exceptions: this.articleCategoriesAsDto(this._exceptions),
    } as ArticleDto;
  }
}
