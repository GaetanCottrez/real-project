import { ICustomer } from '../../../interfaces/customer.interface';
import { User } from '../../../users/domain/models/user';
import { DeliveryAddress } from './deliveryAddress';
import { CustomerDto } from '../data-transfer-objects/customer-dto';
import { DeliveryAddressDto } from '../data-transfer-objects/delivery-address-dto';
import { ConstructCustomerDto } from '../data-transfer-objects/construct-customer-dto';

export class Customer implements ICustomer {
  private _id: string;
  private _reference: string;
  private _account: string;
  private _addressLine1: string;
  private _addressLine2: string;
  private _ape: string;
  private _blocked: boolean;
  private _categoryRate: string;
  private _city: string;
  private _country: string;
  private _comments: string;
  private _commercial: User;
  private _contact: string;
  private _deliveryAddress: DeliveryAddress[];
  private _designation: string;
  private _email: string;
  private _phoneNumber: string;
  private _quality: string;
  private _siret: string;
  private _sleep: boolean;
  private _type: string;
  private _vatNumber: string;
  private _website: string;
  private _zip: string;
  private _archived?: boolean;
  private _trash?: boolean;

  constructor(customer: ConstructCustomerDto) {
    this._id = customer.id;
    this._reference = customer.reference;
    this._account = customer.account;
    this._addressLine1 = customer.addressLine1;
    this._addressLine2 = customer.addressLine2;
    this._ape = customer.ape;
    this._blocked = customer.blocked;
    this._categoryRate = customer.categoryRate;
    this._city = customer.city;
    this._country = customer.country;
    this._comments = customer.comments;
    this._commercial = customer.commercial;
    this._contact = customer.contact;
    this._deliveryAddress = customer.deliveryAddress;
    this._designation = customer.designation;
    this._email = customer.email;
    this._phoneNumber = customer.phoneNumber;
    this._quality = customer.quality;
    this._siret = customer.siret;
    this._sleep = customer.sleep;
    this._type = customer.type;
    this._vatNumber = customer.vatNumber;
    this._website = customer.website;
    this._zip = customer.zip;
  }

  public get id(): string {
    return this._id;
  }

  public get reference(): string {
    return this._reference;
  }

  public get account(): string {
    return this._account;
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

  public get ape(): string {
    return this._ape;
  }

  public get blocked(): boolean {
    return this._blocked;
  }

  public get categoryRate(): string {
    return this._categoryRate;
  }

  public get comments(): string {
    return this._comments;
  }

  public get commercial(): User {
    return this._commercial;
  }

  public get contact(): string {
    return this._contact;
  }

  public get deliveryAddress(): DeliveryAddress[] {
    return this._deliveryAddress;
  }

  public get designation(): string {
    return this._designation;
  }

  public get email(): string {
    return this._email;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public get quality(): string {
    return this._quality;
  }

  public get siret(): string {
    return this._siret;
  }

  public get sleep(): boolean {
    return this._sleep;
  }

  public get type(): string {
    return this._type;
  }

  public get vatNumber(): string {
    return this._vatNumber;
  }

  public get website(): string {
    return this._website;
  }

  public get archived(): boolean {
    return this._archived;
  }

  public get trash(): boolean {
    return this._trash;
  }

  deliveryAddressAsDto(
    deliveryAddress: DeliveryAddress[],
  ): DeliveryAddressDto[] {
    const arrayDeliveryAddressDto: DeliveryAddressDto[] = [];

    deliveryAddress.forEach(delivery => {
      arrayDeliveryAddressDto.push(delivery.asDTO());
    });

    return arrayDeliveryAddressDto;
  }

  asDTO(): CustomerDto {
    return {
      id: this._id,
      reference: this._reference,
      account: this._account,
      addressLine1: this._addressLine1,
      addressLine2: this._addressLine2,
      ape: this._ape,
      blocked: this._blocked,
      categoryRate: this._categoryRate,
      city: this._city,
      country: this._country,
      comments: this._comments,
      commercial: this._commercial.asDTOWithoutPassword(),
      contact: this._contact,
      deliveryAddress: this.deliveryAddressAsDto(this._deliveryAddress),
      designation: this._designation,
      email: this._email,
      phoneNumber: this._phoneNumber,
      quality: this._quality,
      siret: this._siret,
      sleep: this._sleep,
      type: this._type,
      vatNumber: this._vatNumber,
      website: this._website,
      zip: this._zip,
    } as CustomerDto;
  }

  addDeliveryAddress(deliveryAddress: DeliveryAddressDto) {
    this._deliveryAddress.push(DeliveryAddress.create(deliveryAddress));
  }

  removeDeliveryAddress(id: string) {
    for (let i = 0; i < this._deliveryAddress.length; i++) {
      if (this._deliveryAddress[i].id === id) {
        this._deliveryAddress.splice(i, 1);
      }
    }
  }
}
