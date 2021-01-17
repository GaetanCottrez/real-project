import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { CustomersService } from '../application/customers.service';
import { MongodbCustomersRepository } from '../infrastructure/repositories/mongodb-customers.repository';
import MockCustomers from '../../../test/__mocks__/customers';
import MockUsers from '../../../test/__mocks__/users';
import { DeliveryAddressDto } from '../domain/data-transfer-objects/delivery-address-dto';

describe('CustomersService', () => {
  let service: CustomersService;
  let con: MongoClient;
  let db: Db;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    process.env.MONGO_URL = mongoUri;
    con = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = con.db(await mongoServer.getDbName());
    await MockUsers(db);
    await MockCustomers(db);

    service = new CustomersService(new MongodbCustomersRepository(db));
  });

  afterAll(async () => {
    if (con) {
      await con.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should be getCustomers and getCustomerById', async () => {
    const customers = await service.getCustomers();
    const selectInCustomersView = await service.customerView(customers[0]);
    const instanceCustomer = await service.getCustomerById(customers[0].id);
    const oneCustomer = await service.customerView(instanceCustomer);

    expect(selectInCustomersView.id).toEqual(oneCustomer.id);
    expect(selectInCustomersView.reference).toEqual(oneCustomer.reference);
    expect(selectInCustomersView.account).toEqual(oneCustomer.account);
    expect(selectInCustomersView.addressLine1).toEqual(
      oneCustomer.addressLine1,
    );
    expect(selectInCustomersView.addressLine2).toEqual(
      oneCustomer.addressLine2,
    );
    expect(selectInCustomersView.ape).toEqual(oneCustomer.ape);
    expect(selectInCustomersView.blocked).toEqual(oneCustomer.blocked);
    expect(selectInCustomersView.categoryRate).toEqual(
      oneCustomer.categoryRate,
    );
    expect(selectInCustomersView.city).toEqual(oneCustomer.city);
    expect(selectInCustomersView.country).toEqual(oneCustomer.country);
    expect(selectInCustomersView.comments).toEqual(oneCustomer.comments);
    expect(selectInCustomersView.commercial).toEqual(oneCustomer.commercial);
    expect(selectInCustomersView.contact).toEqual(oneCustomer.contact);
    expect(selectInCustomersView.deliveryAddress).toEqual(
      oneCustomer.deliveryAddress,
    );
    expect(selectInCustomersView.designation).toEqual(oneCustomer.designation);
    expect(selectInCustomersView.email).toEqual(oneCustomer.email);
    expect(selectInCustomersView.phoneNumber).toEqual(oneCustomer.phoneNumber);
    expect(selectInCustomersView.siret).toEqual(oneCustomer.siret);
    expect(selectInCustomersView.sleep).toEqual(oneCustomer.sleep);
    expect(selectInCustomersView.type).toEqual(oneCustomer.type);
    expect(selectInCustomersView.vatNumber).toEqual(oneCustomer.vatNumber);
    expect(selectInCustomersView.website).toEqual(oneCustomer.website);
    expect(selectInCustomersView.zip).toEqual(oneCustomer.zip);

    expect(selectInCustomersView.deliveryAddress[0]).toHaveProperty(
      'externalId',
    );
    expect(selectInCustomersView.deliveryAddress[0]).toHaveProperty(
      'designation',
    );
    expect(selectInCustomersView.deliveryAddress[0]).toHaveProperty(
      'addressLine1',
    );
    expect(selectInCustomersView.deliveryAddress[0]).toHaveProperty(
      'addressLine2',
    );
    expect(selectInCustomersView.deliveryAddress[0]).toHaveProperty('zip');
    expect(selectInCustomersView.deliveryAddress[0]).toHaveProperty('city');
    expect(selectInCustomersView.deliveryAddress[0]).toHaveProperty('country');
    expect(selectInCustomersView.deliveryAddress[0]).toHaveProperty('default');
    expect(selectInCustomersView.deliveryAddress[0]).toHaveProperty('contact');
    expect(selectInCustomersView.deliveryAddress[0]).toHaveProperty(
      'phoneNumber',
    );
  });

  it('addDeliveryAddress', async () => {
    const customers = await service.getCustomers();

    const deliveryAddress = {
      designation: 'SARL NEGOLOC VP45',
      addressLine1: '36, rue de la paix',
      addressLine2: 'Quartier des éloges',
      zip: '75000',
      city: 'Paris',
      country: 'FRANCE',
      default: false,
      contact: 'Jean Dupont',
      phoneNumber: '0612345678',
    } as DeliveryAddressDto;

    const customerWithNewDeliveryAddress = await service.addDeliveryAddress(
      customers[0].id,
      deliveryAddress,
    );

    expect(
      customerWithNewDeliveryAddress.deliveryAddress[2].designation,
    ).toEqual(deliveryAddress.designation);
    expect(customerWithNewDeliveryAddress.deliveryAddress[2].city).toEqual(
      deliveryAddress.city,
    );
    expect(customerWithNewDeliveryAddress.deliveryAddress[2].country).toEqual(
      deliveryAddress.country,
    );
    expect(customerWithNewDeliveryAddress.deliveryAddress[2].default).toEqual(
      deliveryAddress.default,
    );
    expect(customerWithNewDeliveryAddress.deliveryAddress[2].contact).toEqual(
      deliveryAddress.contact,
    );
    expect(
      customerWithNewDeliveryAddress.deliveryAddress[2].phoneNumber,
    ).toEqual(deliveryAddress.phoneNumber);

    const instanceCustomer = await service.getCustomerById(
      customerWithNewDeliveryAddress.id,
    );

    expect(instanceCustomer.deliveryAddress[2].designation).toEqual(
      deliveryAddress.designation,
    );
    expect(instanceCustomer.deliveryAddress[2].city).toEqual(
      deliveryAddress.city,
    );
    expect(instanceCustomer.deliveryAddress[2].country).toEqual(
      deliveryAddress.country,
    );
    expect(instanceCustomer.deliveryAddress[2].default).toEqual(
      deliveryAddress.default,
    );
    expect(instanceCustomer.deliveryAddress[2].contact).toEqual(
      deliveryAddress.contact,
    );
    expect(instanceCustomer.deliveryAddress[2].phoneNumber).toEqual(
      deliveryAddress.phoneNumber,
    );
  });

  it('removeDeliveryAddress', async () => {
    const customers = await service.getCustomers();

    const removeDeliveryAddressCustomer = await service.removeDeliveryAddress(customers[0].id, customers[0].deliveryAddress[1].id)
    const instanceCustomer = await service.getCustomerById(customers[0].id);

    expect(removeDeliveryAddressCustomer.deliveryAddress[1].id).not.toEqual(
      customers[0].deliveryAddress[1].id
    );
    expect(instanceCustomer.deliveryAddress[1].id).not.toEqual(
      customers[0].deliveryAddress[1].id
    );
  });
});
