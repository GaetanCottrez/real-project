import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import MockCustomers from '../../../test/__mocks__/customers';
import MockUsers from '../../../test/__mocks__/users';
import MockArticles from '../../../test/__mocks__/articles';
import { OrdersService } from '../application/orders.service';
import { MongodbOrdersRepository } from '../infrastructure/repositories/mongodb-orders.repository';
import { typeAccountUserEnum } from '../../interfaces/user.interface';
import { CustomersService } from '../../customers/application/customers.service';
import { MongodbCustomersRepository } from '../../customers/infrastructure/repositories/mongodb-customers.repository';
import { UsersService } from '../../users/application/users.service';
import { MongodbUsersRepository } from '../../users/infrastructure/repositories/mongodb-users.repository';
import { CreateOrderDto } from '../domain/data-transfer-objects/create-order.dto';
import { CreateLineOrderDto } from '../domain/data-transfer-objects/create-line-order.dto';
import { ArticlesService } from '../../articles/application/articles.service';
import { MongodbArticlesRepository } from '../../articles/infrastructure/repositories/mongodb-articles.repository';

describe('OrdersService', () => {
  let service: OrdersService;
  let serviceCustomer: CustomersService;
  let serviceUser: UsersService;
  let serviceArticle: ArticlesService;
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
    await MockArticles(db);

    serviceCustomer = new CustomersService(new MongodbCustomersRepository(db));
    serviceUser = new UsersService(new MongodbUsersRepository(db));
    serviceArticle = new ArticlesService(new MongodbArticlesRepository(db));

    service = new OrdersService(
      new MongodbOrdersRepository(
        db,
        serviceUser,
        serviceCustomer,
        serviceArticle,
      ),
      serviceCustomer,
      serviceUser,
      serviceArticle,
    );
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

  it('create order', async () => {
    const allCustomers = await serviceCustomer.getCustomers();
    const allUsers = await serviceUser.getUsers();
    const allArticles = await serviceArticle.getArticles();
    const createLines: CreateLineOrderDto[] = [
      {
        article: allArticles[0].id,
        referenceArticle: allArticles[0].reference,
        descriptionArticle: allArticles[0].description,
        quantity: 2,
        unitPrice: 179,
        discount: 0,
      },
    ];
    const orderCreate = {
      typeAccountUser: typeAccountUserEnum.normal,
      temporaryDocNumber: 'temp12345',
      customerId: allCustomers[0].id,
      deliveryInstructions: 'attention livraison fragile',
      commercialId: allUsers[0].id,
      yourReference: 'commande fournisseur XXXX',
      shippingFees: 0,
      deliveryAddressId: allCustomers[0].deliveryAddress[0].id,
      lines: createLines,
    } as CreateOrderDto;

    const orderInstance = await service.create(orderCreate);

    const controlOrder = service.buildInstanceOrder(
      await service.getOrderById(orderInstance.id),
    );

    expect(orderCreate.temporaryDocNumber).toEqual(
      controlOrder.temporaryDocNumber,
    );
    expect(orderCreate.yourReference).toEqual(controlOrder.yourReference);
    expect(orderCreate.commercialId).toEqual(controlOrder.commercial.id);
    expect(orderCreate.customerId).toEqual(controlOrder.customer.id);
    expect(orderCreate.deliveryAddressId).toEqual(
      controlOrder.deliveryAddress.id,
    );

    expect(orderCreate.lines[0].article).toEqual(
      controlOrder.lines[0].article.id,
    );
    expect(orderCreate.lines[0].referenceArticle).toEqual(
      controlOrder.lines[0].referenceArticle,
    );
    expect(orderCreate.lines[0].descriptionArticle).toEqual(
      controlOrder.lines[0].descriptionArticle,
    );
    expect(orderCreate.lines[0].quantity).toEqual(
      controlOrder.lines[0].quantity,
    );
    expect(orderCreate.lines[0].unitPrice).toEqual(
      controlOrder.lines[0].unitPrice,
    );
    expect(orderCreate.lines[0].discount).toEqual(
      controlOrder.lines[0].discount,
    );
    expect(orderInstance).toEqual(controlOrder);
  });

  it('create order - error duplicate order', async () => {
    const allCustomers = await serviceCustomer.getCustomers();
    const allUsers = await serviceUser.getUsers();
    const orderCreate = {
      typeAccountUser: typeAccountUserEnum.normal,
      temporaryDocNumber: 'temp12345',
      customerId: allCustomers[0].id,
      deliveryInstructions: 'attention livraison fragile',
      commercialId: allUsers[0].id,
      yourReference: 'commande fournisseur XXXX',
      shippingFees: 0,
      deliveryAddressId: allCustomers[0].deliveryAddress[0].id,
    } as CreateOrderDto;

    let statusCreateOrder = 200;
    try {
      await service.create(orderCreate);
    } catch (error) {
      statusCreateOrder = error.status;
    }
    expect(statusCreateOrder).toEqual(406);
  });
});
