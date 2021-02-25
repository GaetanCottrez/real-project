import { ILineOrder } from '../../../interfaces/order.interface';
import { Article } from '../../../articles/domain/models/article';
import { LineOrderDto } from '../data-transfer-objects/line-order.dto';
import { ConstructLineOrderDto } from '../data-transfer-objects/construct-line-order.dto';
import { CreateLineOrderDto } from '../data-transfer-objects/create-line-order.dto';

export class LineOrder implements ILineOrder {
  private _article: Article;
  private _descriptionArticle: string;
  private _discount: number;
  private _referenceArticle: string;
  private _quantity: number;
  private _unitPrice: number;

  constructor(lineOrderDto: ConstructLineOrderDto) {
    this._article = lineOrderDto.article;
    this._descriptionArticle = lineOrderDto.descriptionArticle;
    this._discount = lineOrderDto.discount;
    this._referenceArticle = lineOrderDto.referenceArticle;
    this._unitPrice = lineOrderDto.unitPrice;
    this._quantity = lineOrderDto.quantity;
  }

  get article(): Article {
    return this._article;
  }

  get descriptionArticle(): string {
    return this._descriptionArticle;
  }

  get discount(): number {
    return this._discount;
  }

  get referenceArticle(): string {
    return this._referenceArticle;
  }

  get unitPrice(): number {
    return this._unitPrice;
  }

  get quantity(): number {
    return this._quantity;
  }

  asDTO(): LineOrderDto {
    return {
      article: this._article.asDTO(),
      referenceArticle: this._referenceArticle,
      descriptionArticle: this._descriptionArticle,
      unitPrice: this._unitPrice,
      quantity: this._quantity,
      discount: this._discount,
    } as LineOrderDto;
  }

  static create(createLineOrderDto: CreateLineOrderDto, article: Article) {
    return new LineOrder({
      article: article,
      referenceArticle: createLineOrderDto.referenceArticle,
      descriptionArticle: createLineOrderDto.descriptionArticle,
      unitPrice: createLineOrderDto.unitPrice,
      quantity: createLineOrderDto.quantity,
      discount: createLineOrderDto.discount
    } as ConstructLineOrderDto);
  }
}
