import { Inject, Injectable } from '@nestjs/common';
import MongoDbRepository from '../../../database/mongodb/MongoDbRepository.repository';
import { IOrdersRepository } from '../../domain/repositories/orders-repository';
import { Order } from '../../domain/models/order';
import { LineOrderDto } from '../../domain/data-transfer-objects/line-order.dto';
import { LineOrder } from '../../domain/models/lineOrder';
import { OrderDto } from '../../domain/data-transfer-objects/order.dto';
import { CreateOrderDto } from '../../domain/data-transfer-objects/create-order.dto';
import {
  DeliveryOrderMongoDto,
  OrderMongoDto,
} from './data-transfer-objects/order-mongo.dto';
import { DeliveryAddressDto } from '../../../customers/domain/data-transfer-objects/delivery-address-dto';
import { UsersService } from '../../../users/application/users.service';
import { CustomersService } from '../../../customers/application/customers.service';
import { ConstructOrderDto } from '../../domain/data-transfer-objects/construct-order.dto';
import { DeliveryAddress } from '../../../customers/domain/models/deliveryAddress';
import { createInstanceService } from '../../../shared/application/createInstance.service';
import { LineOrderMongoDto } from './data-transfer-objects/lineOrder-mongo.dto';
import { ConstructLineOrderDto } from '../../domain/data-transfer-objects/construct-line-order.dto';
import { Article } from '../../../articles/domain/models/article';
import { ArticlesService } from '../../../articles/application/articles.service';

@Injectable()
export class MongodbOrdersRepository implements IOrdersRepository {
  private mongoClient = new MongoDbRepository();
  private nameCollection = 'Orders';

  constructor(
    db = null,
    private usersService: UsersService,
    private customersService: CustomersService,
    private articlesService: ArticlesService,
  ) {
    if (db != null) {
      this.mongoClient.database = db;
    }
  }

  addLines(order: Order, lines: LineOrderDto[]): LineOrder[] {
    return [];
  }

  async create(order: CreateOrderDto): Promise<Order> {
    return undefined;
  }

  edit(orderId: string, order: OrderDto): Promise<Order> {
    return Promise.resolve(undefined);
  }

  private async find(match: object): Promise<ConstructOrderDto[]> {
    const findOrders: OrderMongoDto[] = await this.mongoClient.database
      .collection(this.nameCollection)
      .find(match)
      .toArray();
    const ordersDto: ConstructOrderDto[] = [];
    for (const order of findOrders) {
      ordersDto.push({
        id: order.id,
        typeAccountUser: order.account,
        docNumber: order.do_piece,
        temporaryDocNumber: order.tmp_id,
        customer: (
          await this.customersService.getCustomers({
            ct_num: order.client_numero,
          })
        )[0],
        deliveryInstructions: order.instructions_livraison,
        date: order.do_date,
        commercial: await this.usersService.getUserByExternalId(
          order.collaborateur,
        ),
        yourReference: order.reference_client,
        shippingFees: order.frais_de_port,
        deliveryAddress: this.convertDeliveryOrderFromDatabase(order.livraison),
        state: order.status,
        lines: await this.convertLineOrderFromDatabase(order.lignes),
      } as ConstructOrderDto);
    }
    return ordersDto;
  }

  async getOrderById(orderId: string): Promise<ConstructOrderDto> | null {
    const findOrder: ConstructOrderDto[] = await this.find({ id: orderId });
    return findOrder.length > 0 ? findOrder[0] : null;
  }

  getOrders(): Promise<ConstructOrderDto[]> {
    return Promise.resolve([]);
  }

  async checkIsTemporaryDocNumberExist(
    temporaryDocNumber: string,
  ): Promise<Boolean> {
    const findOrder = await this.find({ tmp_id: temporaryDocNumber });

    return findOrder.length > 0;
  }

  private convertDeliveryOrderToDatabase(
    deliveryAddress: DeliveryAddressDto,
  ): DeliveryOrderMongoDto {
    return {
      id: deliveryAddress.id,
      li_no: String(deliveryAddress.externalId),
      li_intitule: deliveryAddress.designation,
      li_adresse: deliveryAddress.addressLine1,
      li_complement: deliveryAddress.addressLine2,
      li_codepostal: deliveryAddress.zip,
      li_ville: deliveryAddress.city,
      li_pays: deliveryAddress.country,
      li_principal: deliveryAddress.default === true ? '1' : '0',
      li_contact: deliveryAddress.contact,
      li_telephone: deliveryAddress.phoneNumber,
    } as DeliveryOrderMongoDto;
  }

  private toDatabase(orderDto: OrderDto): OrderMongoDto {
    return {
      id: orderDto.id,
      lignes: this.convertLineOrderToDatabase(orderDto.lines),
      frais_de_port: orderDto.shippingFees,
      instructions_livraison: orderDto.deliveryInstructions,
      reference_client: orderDto.yourReference,
      client_numero: orderDto.customer.reference,
      client_address: orderDto.customer.addressLine1,
      code_postal: orderDto.customer.zip,
      n_cattarif: orderDto.customer.categoryRate,
      livraison: this.convertDeliveryOrderToDatabase(orderDto.deliveryAddress),
      account: orderDto.typeAccountUser,
      li_no: orderDto.deliveryAddress.externalId,
      collaborateur: orderDto.commercial.externalId,
      do_date: orderDto.date,
      do_type: 1,
      tmp_id: orderDto.temporaryDocNumber,
      status: orderDto.state,
      co_no: String(orderDto.commercial.externalId),
    } as OrderMongoDto;
  }

  async save(orderDto: OrderDto): Promise<void> {
    const orderForMongo = this.toDatabase(orderDto);

    await this.mongoClient.database
      .collection(this.nameCollection)
      .replaceOne({ id: orderForMongo.id }, orderForMongo, { upsert: true });
  }

  private convertDeliveryOrderFromDatabase(
    deliveryAddress: DeliveryOrderMongoDto,
  ): DeliveryAddress {
    return createInstanceService.deliveryAddress({
      id: deliveryAddress.id,
      externalId: Number(deliveryAddress.li_no),
      designation: deliveryAddress.li_intitule,
      addressLine1: deliveryAddress.li_adresse,
      addressLine2: deliveryAddress.li_complement,
      zip: deliveryAddress.li_codepostal,
      city: deliveryAddress.li_ville,
      country: deliveryAddress.li_pays,
      default:
        deliveryAddress.li_principal && deliveryAddress.li_principal === '1'
          ? true
          : false,
      contact: deliveryAddress.li_contact,
      phoneNumber: deliveryAddress.li_telephone,
    } as DeliveryAddressDto);
  }

  private convertLineOrderToDatabase(lines: LineOrderDto[]) : LineOrderMongoDto[] {
    const linesOrderMongoDto: LineOrderMongoDto[] = [];
    lines.forEach(line =>{
      linesOrderMongoDto.push({
        dl_ref: line.article.reference,
        dl_design: line.descriptionArticle,
        dl_qte: line.quantity,
        dl_prixunitaire: line.unitPrice,
        remise: line.discount,
      } as LineOrderMongoDto)
    })
    return linesOrderMongoDto;
  }

  private getArticle(listArticles: Article[], referenceArticle: string): Article {
    return listArticles
      .filter(article => String(article.reference) === String(referenceArticle))
      .pop();
  }

  private async convertLineOrderFromDatabase(lines: LineOrderMongoDto[]): Promise<LineOrder[]> {
    const listArticles = await this.articlesService.getArticles();
    const linesOrder: LineOrder[] = []
    lines.forEach(line => {
      linesOrder.push(createInstanceService.lineOrder({
        article: this.getArticle(listArticles, line.dl_ref),
        referenceArticle: line.dl_ref,
        descriptionArticle: line.dl_design,
        unitPrice: line.dl_prixunitaire,
        quantity: line.dl_qte,
        discount: line.remise
      } as ConstructLineOrderDto))
    })
    return linesOrder;
  }
}
