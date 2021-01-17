export class DeliveryAddressDto {

  readonly id: string;

  readonly externalId: number;

  readonly designation: string;

  readonly addressLine1: string;

  readonly addressLine2: string;

  readonly zip: string;

  readonly city: string;

  readonly country: string;

  readonly default: boolean;

  readonly contact: string;

  readonly phoneNumber: string;
}
