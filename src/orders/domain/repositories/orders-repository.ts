import { Order } from '../models/order';
import { LineOrderDto } from '../data-transfer-objects/line-order.dto';
import { LineOrder } from '../models/lineOrder';
import { OrderDto } from '../data-transfer-objects/order.dto';
import { CreateOrderDto } from '../data-transfer-objects/create-order.dto';
import { ConstructOrderDto } from '../data-transfer-objects/construct-order.dto';

export interface IOrdersRepository {
  getOrderById(orderId: string): Promise<ConstructOrderDto>;

  getOrders(): Promise<ConstructOrderDto[]>;

  addLines(order: Order, lines: LineOrderDto[]): LineOrder[];

  create(order: CreateOrderDto): Promise<Order>;

  edit(orderId: string, order: OrderDto): Promise<Order>;

  checkIsTemporaryDocNumberExist(temporaryDocNumber: string) : Promise<Boolean>

  save(orderDto: OrderDto): Promise<void>
}
