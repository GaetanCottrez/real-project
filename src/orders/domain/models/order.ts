import { IOrder, stateOrderEnum } from '../../../interfaces/order.interface';
import { typeAccountUserEnum } from '../../../interfaces/user.interface';
import { Customer } from '../../../customers/domain/models/customer';
import { User } from '../../../users/domain/models/user';
import { DeliveryAddress } from '../../../customers/domain/models/deliveryAddress';
import { LineOrder } from './lineOrder';
import { OrderDto } from '../data-transfer-objects/order.dto';
import { v4 as uuid } from 'uuid';
import { DomainError } from '../../../shared/domain/domain-error';
import { ConstructOrderDto } from '../data-transfer-objects/construct-order.dto';
import { LineOrderDto } from '../data-transfer-objects/line-order.dto';
import { CreateLineOrderDto } from '../data-transfer-objects/create-line-order.dto';
import { Article } from '../../../articles/domain/models/article';

export class Order implements IOrder {
  private _commercial: User;
  private _customer: Customer;
  private _date: Date;
  private _deliveryAddress: DeliveryAddress;
  private _deliveryInstructions: string;
  private _docNumber: string;
  private _id: string;
  private _lines: LineOrder[];
  private _shippingFees: number;
  private _state: stateOrderEnum;
  private _temporaryDocNumber: string;
  private _typeAccountUser: typeAccountUserEnum;
  private _yourReference: string;

  constructor(orderDto: ConstructOrderDto) {
    this._commercial = orderDto.commercial;
    this._customer = orderDto.customer;
    this._date = orderDto.date;
    this._deliveryAddress = orderDto.deliveryAddress;
    this._deliveryInstructions = orderDto.deliveryInstructions;
    this._docNumber = orderDto.docNumber ? orderDto.docNumber : null;
    this._id = orderDto.id;
    this._lines = orderDto.lines;
    this._shippingFees = orderDto.shippingFees;
    this._state = orderDto.state;
    this._temporaryDocNumber = orderDto.temporaryDocNumber;
    this._typeAccountUser = orderDto.typeAccountUser;
    this._yourReference = orderDto.yourReference;
  }

  get commercial(): User {
    return this._commercial;
  }

  get customer(): Customer {
    return this._customer;
  }

  get date(): Date {
    return this._date;
  }

  get deliveryAddress(): DeliveryAddress {
    return this._deliveryAddress;
  }

  get deliveryInstructions(): string {
    return this._deliveryInstructions;
  }

  get docNumber(): string {
    return this._docNumber;
  }

  get id(): string {
    return this._id;
  }

  get shippingFees(): number {
    return this._shippingFees;
  }

  get state(): stateOrderEnum {
    return this._state;
  }

  get temporaryDocNumber(): string {
    return this._temporaryDocNumber;
  }

  get typeAccountUser(): typeAccountUserEnum {
    return this._typeAccountUser;
  }

  get yourReference(): string {
    return this._yourReference;
  }

  get lines(): LineOrder[] {
    return this._lines;
  }

  static isDeliveryAddressIdExistInCustomer(
    deliveryAddress: DeliveryAddress[],
    deliveryAddressId: string,
  ): DeliveryAddress {
    const findDeliveryAddress = deliveryAddress
      .filter(deliveryAddress => deliveryAddress.id === deliveryAddressId)
      .pop();
    if (!findDeliveryAddress) {
      throw new DomainError(
        `The delivery address with id ${deliveryAddressId} doesn't exist in this customer`,
      );
    }

    return findDeliveryAddress;
  }

  asDTO(): OrderDto {
    return {
      id: this._id,
      typeAccountUser: this._typeAccountUser,
      docNumber: this._docNumber,
      temporaryDocNumber: this._temporaryDocNumber,
      customer: this._customer.asDTO(),
      deliveryInstructions: this._deliveryInstructions,
      date: this._date,
      commercial: this._commercial.asDTO(),
      yourReference: this._yourReference,
      shippingFees: this._shippingFees,
      deliveryAddress: this._deliveryAddress.asDTO(),
      state: this._state,
      lines: this.orderLinesDto(),
    } as OrderDto;
  }

  static create(orderDto: ConstructOrderDto, deliveryAddressId: string): Order {
    const deliveryAddress = this.isDeliveryAddressIdExistInCustomer(
      orderDto.customer.deliveryAddress,
      deliveryAddressId,
    );

    return new Order({
      typeAccountUser: orderDto.typeAccountUser,
      temporaryDocNumber: orderDto.temporaryDocNumber,
      customer: orderDto.customer,
      deliveryInstructions: orderDto.deliveryInstructions,
      commercial: orderDto.commercial,
      yourReference: orderDto.yourReference,
      shippingFees: orderDto.shippingFees,
      deliveryAddress: deliveryAddress,
      lines: [],
      id: uuid(),
      date: new Date(),
      state: stateOrderEnum.pouch,
    } as ConstructOrderDto);
  }

  private orderLinesDto(): LineOrderDto[] {
    const linesOrderDto: LineOrderDto[] = [];
    this._lines.forEach(line => {
      linesOrderDto.push(line.asDTO());
    });
    return linesOrderDto;
  }

  pushLines(lines: CreateLineOrderDto[], listArticles: Article[]): void {
    lines.forEach(line => {
      const article = this.isArticleExist(listArticles, line.article);
      this._lines.push(LineOrder.create(line, article))
    })
  }

  private isArticleExist(listArticles: Article[], articleId: string): Article {
    const findArticle = listArticles
      .filter(article => String(article.id) === String(articleId))
      .pop();
    if (!findArticle) {
      throw new DomainError(
        `The article with id ${articleId} doesn't exist.`,
      );
    }
    return findArticle;
  }
}
