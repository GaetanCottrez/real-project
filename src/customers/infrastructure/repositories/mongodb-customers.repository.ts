import { Injectable } from '@nestjs/common';
import MongoDbRepository from '../../../database/mongodb/MongoDbRepository.repository';
import { createInstanceService } from '../../../shared/application/createInstance.service';
import { Customer } from '../../domain/models/customer';
import { ObjectID } from 'mongodb';
import { ICustomersRepository } from '../../domain/repositories/customers-repository';
import { ConstructCustomerDto } from '../../domain/data-transfer-objects/construct-customer-dto';
import { DeliveryAddress } from '../../domain/models/deliveryAddress';
import { DeliveryAddressDto } from '../../domain/data-transfer-objects/delivery-address-dto';
import { UserDto } from '../../../users/domain/data-transfer-objects/user-dto';
import { CustomerDto } from '../../domain/data-transfer-objects/customer-dto';

@Injectable()
export class MongodbCustomersRepository implements ICustomersRepository {
  private mongoClient = new MongoDbRepository();
  private nameCollection = 'Customers';

  constructor(db = null) {
    if (db != null) {
      this.mongoClient.database = db;
    }
  }

  convertDeliveryAddressFromDatabase(deliveryAddress: any): DeliveryAddress[] {
    const arrayInstanceDeliveryAddress: DeliveryAddress[] = [];
    deliveryAddress.forEach(delivery => {
      arrayInstanceDeliveryAddress.push(
        createInstanceService.deliveryAddress({
          id: delivery.id,
          externalId: Number(delivery.li_no),
          designation: delivery.li_intitule,
          addressLine1: delivery.li_adresse,
          addressLine2: delivery.li_complement,
          zip: delivery.li_codepostal,
          city: delivery.li_ville,
          country: delivery.li_pays,
          default: delivery.li_principal === '1' ? true : false,
          contact: delivery.li_contact,
          phoneNumber: delivery.li_telephone,
        } as DeliveryAddressDto),
      );
    });
    return arrayInstanceDeliveryAddress;
  }

  async fromDatabase(customer: any): Promise<Customer> {
    return createInstanceService.customer({
      id: customer._id,
      reference: customer.ct_num,
      account: customer.account,
      addressLine1: customer.ct_adresse,
      addressLine2: customer.ct_complement,
      ape: customer.ct_ape,
      blocked: customer.ct_controlenc === '2' ? true : false,
      categoryRate: customer.n_cattarif,
      city: customer.ct_ville,
      country: customer.ct_pays,
      comments: customer.ct_commentaire,
      commercial: createInstanceService.user(customer.co_no[0] as UserDto),
      contact: customer.ct_contact,
      deliveryAddress: this.convertDeliveryAddressFromDatabase(
        customer.delivery_adresses,
      ),
      designation: customer.ct_intitule,
      email: customer.ct_email,
      phoneNumber: customer.ct_telephone,
      quality: customer.ct_qualite,
      siret: customer.ct_siret,
      sleep: customer.ct_sommeil === '1' ? true : false,
      type: customer.ct_type,
      vatNumber: customer.ct_identifiant,
      website: customer.ct_site,
      zip: customer.ct_codepostal,
    } as ConstructCustomerDto);
  }

  async getCustomers(match: object = {}): Promise<Customer[]> {
    return await this.find(match);
  }

  async getCustomerById(id: string): Promise<Customer> {
    return await this.findOne({ _id: new ObjectID(id) });
  }

  private async find(match: object) {
    let pipeline: Array<any> = [
      {
        $match: match,
      },
      {
        $lookup: {
          from: 'Users',
          localField: 'co_no',
          foreignField: 'externalId',
          as: 'user',
        },
      },
      {
        $project: {
          _id: 1,
          id: 1,
          ct_num: 1,
          ct_intitule: 1,
          ct_type: 1,
          ct_qualite: 1,
          ct_classement: 1,
          n_cattarif: 1,
          ct_contact: 1,
          ct_adresse: 1,
          ct_complement: 1,
          ct_codepostal: 1,
          ct_ville: 1,
          ct_pays: 1,
          ct_ape: 1,
          ct_identifiant: 1,
          ct_siret: 1,
          ct_telephone: 1,
          ct_email: 1,
          ct_site: 1,
          ct_sommeil: 1,
          ct_controlenc: 1,
          ct_commentaire: 1,
          co_no: '$user',
          account: 1,
          delivery_adresses: 1,
        },
      },
    ];

    const customers = await this.mongoClient.database
      .collection(this.nameCollection)
      .aggregate(pipeline)
      .toArray();
    const customersFormatted: Customer[] = [];
    for (const customer of customers) {
      customersFormatted.push(await this.fromDatabase(customer));
    }
    return customersFormatted;
  }

  private async findOne(match: object): Promise<Customer> | null {
    const customers = await this.find(match);

    if (customers.length > 0) {
      return customers[0];
    } else {
      return null;
    }
  }

  convertDeliveryAddressToDatabase(deliveryAddress: DeliveryAddressDto[]) {
    const deliveryAddressForMongo = [];
    deliveryAddress.forEach(delivery => {
      deliveryAddressForMongo.push({
        id: delivery.id,
        li_no: delivery.externalId,
        li_intitule: delivery.designation,
        li_adresse: delivery.addressLine1,
        li_complement: delivery.addressLine2,
        li_codepostal: delivery.zip,
        li_ville: delivery.city,
        li_pays: delivery.country,
        li_principal: delivery.default === true ? '1' : '0',
        li_contact: delivery.contact,
        li_telephone: delivery.phoneNumber,
      });
    });
    return deliveryAddressForMongo;
  }

  async save(customer: CustomerDto): Promise<void> {
    const deliveryAddressForMongo = this.convertDeliveryAddressToDatabase(
      customer.deliveryAddress,
    );

    await this.mongoClient.database
      .collection(this.nameCollection)
      .updateOne(
        { _id: new ObjectID(customer.id) },
        { $set: { delivery_adresses: deliveryAddressForMongo } },
      );
  }
}
