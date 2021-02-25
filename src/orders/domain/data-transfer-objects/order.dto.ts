import { typeAccountUserEnum } from '../../../interfaces/user.interface';
import { stateOrderEnum } from '../../../interfaces/order.interface';
import {CustomerDto} from "../../../customers/domain/data-transfer-objects/customer-dto";
import {UserDto} from "../../../users/domain/data-transfer-objects/user-dto";
import {DeliveryAddressDto} from "../../../customers/domain/data-transfer-objects/delivery-address-dto";
import {LineOrderDto} from "./line-order.dto";


export class OrderDto {
  readonly id: string;
  readonly typeAccountUser: typeAccountUserEnum;
  readonly docNumber?: string;
  readonly temporaryDocNumber?: string;
  readonly customer: CustomerDto;
  readonly deliveryInstructions: string;
  readonly date: Date;
  readonly commercial: UserDto;
  readonly yourReference: string
  readonly shippingFees: number;
  readonly deliveryAddress: DeliveryAddressDto;
  readonly state?: stateOrderEnum;
  readonly lines: LineOrderDto[];
}
