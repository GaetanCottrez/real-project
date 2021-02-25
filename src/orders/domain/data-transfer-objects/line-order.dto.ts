import {ArticleDto} from "../../../articles/domain/data-transfer-objects/article-dto";


export class LineOrderDto {
  readonly article: ArticleDto;
  readonly referenceArticle: string;
  readonly descriptionArticle: string;
  readonly quantity: number;
  readonly unitPrice: number;
  readonly discount: number;
}
