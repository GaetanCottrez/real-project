import { ArticleCategory } from '../models/articleCategory';

export class ArticleDto {

  readonly id: string;

  readonly reference: string;

  readonly description: string;

  readonly familyCode: string;

  readonly warranty: number;

  readonly weightUnit: number;

  readonly weight: number;

  readonly weightNet: number;

  readonly weightGross: number;

  readonly priceBuy: number;

  readonly priceSell: number;

  readonly priceIncludedTaxes: number;

  readonly statusLine1: string;

  readonly statusLine2: string;

  readonly barcode: string;

  readonly country: string;

  readonly categories: ArticleCategory[];

  readonly exceptions: ArticleCategory[];
}
