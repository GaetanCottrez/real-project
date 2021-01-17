import { IDeliveryAddress } from '../../../interfaces/customer.interface';
import { DeliveryAddressDto } from '../data-transfer-objects/delivery-address-dto';
import { v4 as uuid } from 'uuid';

export class DeliveryAddress implements IDeliveryAddress {
  private _id: string;
  private _externalId: number;
  private _designation: string;
  private _addressLine1: string;
  private _addressLine2: string;
  private _zip: string;
  private _city: string;
  private _country: string;
  private _default: boolean;
  private _contact: string;
  private _phoneNumber: string;

  constructor(deliveryAddress: DeliveryAddressDto) {
    this._id = deliveryAddress.id;
    this._externalId = deliveryAddress.externalId
      ? deliveryAddress.externalId
      : 0;
    this._designation = deliveryAddress.designation;
    this._addressLine1 = deliveryAddress.addressLine1;
    this._addressLine2 = deliveryAddress.addressLine2;
    this._zip = deliveryAddress.zip;
    this._city = deliveryAddress.city;
    this._country = deliveryAddress.country;
    this._default = deliveryAddress.default;
    this._contact = deliveryAddress.contact;
    this._phoneNumber = deliveryAddress.phoneNumber;
  }

  public get id(): string {
    return this._id;
  }

  public get externalId(): number {
    return this._externalId;
  }

  public get designation(): string {
    return this._designation;
  }

  public get addressLine1(): string {
    return this._addressLine1;
  }

  public get addressLine2(): string {
    return this._addressLine2;
  }

  public get zip(): string {
    return this._zip;
  }

  public get city(): string {
    return this._city;
  }

  public get country(): string {
    return this._country;
  }

  public get default(): boolean {
    return this._default;
  }

  public get contact(): string {
    return this._contact;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  asDTO(): DeliveryAddressDto {
    return {
      id: this._id,
      externalId: this._externalId,
      designation: this._designation,
      addressLine1: this._addressLine1,
      addressLine2: this._addressLine2,
      zip: this._zip,
      city: this._city,
      country: this._country,
      default: this._default,
      phoneNumber: this._phoneNumber,
      contact: this._contact,
    } as DeliveryAddressDto;
  }

  static create(deliveryAddress: DeliveryAddressDto): DeliveryAddress {
    return new DeliveryAddress({
      id: uuid(),
      externalId: deliveryAddress.externalId,
      designation: deliveryAddress.designation,
      addressLine1: deliveryAddress.addressLine1,
      addressLine2: deliveryAddress.addressLine2,
      zip: deliveryAddress.zip,
      city: deliveryAddress.city,
      country: deliveryAddress.country,
      default: deliveryAddress.default,
      contact: deliveryAddress.contact,
      phoneNumber: deliveryAddress.phoneNumber,
    } as DeliveryAddressDto);
  }
}
