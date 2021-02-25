import {Article} from "../../../articles/domain/models/article";


export class ConstructLineOrderDto {
  readonly article: Article;
  readonly referenceArticle: string;
  readonly descriptionArticle: string;
  readonly unitPrice: number;
  readonly quantity: number;
  readonly discount: number;
}
