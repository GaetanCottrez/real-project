import { User } from '../../../users/domain/models/user';
import { DeliveryAddress } from '../../../customers/domain/models/deliveryAddress';

export class ConstructCustomerDto {

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

  readonly commercial: User;

  readonly contact: string;

  readonly deliveryAddress: DeliveryAddress[] = [];

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
