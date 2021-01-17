import { UserDto } from '../../../users/domain/data-transfer-objects/user-dto';
import { DeliveryAddressDto } from './delivery-address-dto';

export class CustomerDto {

  readonly id: string;

  readonly reference: string;

  readonly account: string;

  readonly addressLine1: string;

  readonly addressLine2: string;

  readonly ape: string;

  readonly blocked: boolean;

  readonly categoryRate: string;

  readonly city: string;

  readonly country: string;

  readonly comments: string;

  readonly commercial: UserDto;

  readonly contact: string;

  readonly deliveryAddress: DeliveryAddressDto[] = [];

  readonly designation: string;

  readonly email: string;

  readonly phoneNumber: string;

  readonly quality: string;

  readonly siret: string;

  readonly sleep: boolean;

  readonly type: string;

  readonly vatNumber: string;

  readonly website: string;

  readonly zip: string;

}
