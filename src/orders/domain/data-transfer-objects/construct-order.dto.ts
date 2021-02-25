import { typeAccountUserEnum } from '../../../interfaces/user.interface';
import { stateOrderEnum } from '../../../interfaces/order.interface';
import { User } from '../../../users/domain/models/user';
import { Customer } from '../../../customers/domain/models/customer';
import { DeliveryAddress } from '../../../customers/domain/models/deliveryAddress';
import { LineOrder } from '../models/lineOrder';
import {CustomerDto} from "../../../customers/domain/data-transfer-objects/customer-dto";


export class ConstructOrderDto {
  readonly id: string;
  readonly typeAccountUser: typeAccountUserEnum;
  readonly docNumber?: string;
  readonly temporaryDocNumber?: string;
  readonly customer: Customer;
  readonly deliveryInstructions: string;
  readonly date: Date;
  readonly commercial: User;
  readonly yourReference: string
  readonly shippingFees: number;
  readonly deliveryAddress: DeliveryAddress;
  readonly state?: stateOrderEnum;
  readonly lines: LineOrder[];
}
