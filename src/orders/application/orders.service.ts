import { Inject, Injectable } from '@nestjs/common';
import { IOrdersRepository } from '../domain/repositories/orders-repository';
import { Order } from '../domain/models/order';
import { LineOrderDto } from '../domain/data-transfer-objects/line-order.dto';
import { LineOrder } from '../domain/models/lineOrder';
import { OrderDto } from '../domain/data-transfer-objects/order.dto';
import { CreateOrderDto } from '../domain/data-transfer-objects/create-order.dto';
import { CustomersService } from '../../customers/application/customers.service';
import { UsersService } from '../../users/application/users.service';
import { DomainError } from '../../shared/domain/domain-error';
import {ConstructOrderDto} from "../domain/data-transfer-objects/construct-order.dto";
import { ArticlesService } from '../../articles/application/articles.service';

@Injectable()
export class OrdersService implements IOrdersRepository {
  constructor(
    @Inject('IOrdersRepository')
    private readonly ordersRepository: IOrdersRepository,
    private readonly customersService: CustomersService,
    private readonly usersService: UsersService,
    private readonly articlesService: ArticlesService,
  ) {}

  addLines(order: Order, lines: LineOrderDto[]): LineOrder[] {
    return [];
  }

  async save(orderDto: OrderDto): Promise<void> {
    await this.ordersRepository.save(orderDto);
  }

  async create(orderDto: CreateOrderDto): Promise<Order> {
    if (
      !(await this.checkIsTemporaryDocNumberExist(orderDto.temporaryDocNumber))
    ) {
      const customer = await this.customersService.getCustomerById(
        orderDto.customerId,
      );
      const commercial = await this.usersService.getUserById(
        orderDto.commercialId,
      );
      const instanceOrder = Order.create({
        typeAccountUser: orderDto.typeAccountUser,
        temporaryDocNumber: orderDto.temporaryDocNumber,
        customer: customer,
        deliveryInstructions: orderDto.deliveryInstructions,
        commercial: commercial,
        yourReference: orderDto.yourReference,
        shippingFees: orderDto.shippingFees,
      } as ConstructOrderDto, orderDto.deliveryAddressId);

      const listArticles = await this.articlesService.getArticles();
      instanceOrder.pushLines(orderDto.lines, listArticles);

      await this.save(this.orderView(instanceOrder));

      return instanceOrder;
    }
  }

  edit(orderId: string, order: OrderDto): Promise<Order> {
    return Promise.resolve(undefined);
  }

  async getOrderById(orderId: string): Promise<ConstructOrderDto> {
    return await this.ordersRepository.getOrderById(orderId);
  }

  getOrders(): Promise<ConstructOrderDto[]> {
    return Promise.resolve([]);
  }

  async getOneOrder(orderId: string) : Promise<OrderDto>{
    const instanceOrder = this.buildInstanceOrder(await this.getOrderById(orderId));
    return this.orderView(instanceOrder);
  }

  orderView(order: Order): OrderDto {
    return order.asDTO()
  }

  buildInstanceOrder(constructOrderDto :ConstructOrderDto): Order {
    return new Order(constructOrderDto)
  }

  async checkIsTemporaryDocNumberExist(
    temporaryDocNumber: string,
  ): Promise<Boolean> {
    if (
      await this.ordersRepository.checkIsTemporaryDocNumberExist(
        temporaryDocNumber,
      )
    ) {
      throw new DomainError(`The temporary doc number isn't unique`);
    }
    return false;
  }
}
