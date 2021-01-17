import { UsersService } from '../application/users.service';
import { RoleEnum } from '../../interfaces/user.interface';
import { UserDto } from '../domain/data-transfer-objects/user-dto';
import { MongodbUsersRepository } from '../infrastructure/repositories/mongodb-users.repository';
import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe("UsersService", () => {
  let service: UsersService;
  let makeUserDto;
  let con: MongoClient;
  let db: Db;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    process.env.MONGO_URL = mongoUri
    con = await MongoClient.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db = con.db(await mongoServer.getDbName());

    service = new UsersService(new MongodbUsersRepository(db));

    makeUserDto = (username = "john.doe", email = "john.doe@nomail.com") => {
      return {
        externalId: 999,
        username: username,
        password: "AA!45aaa",
        firstName: "John",
        lastName: "Doe",
        displayName: "John Doe",
        email: email,
        role: RoleEnum.commercial
      } as UserDto;
    }
  });

  afterAll(async () => {
    if (con) {
      await con.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  it("should be defined", async () => {
    expect(service).toBeDefined();
  });

  it("should instantiate a User", async () => {
    const userDto: UserDto = makeUserDto();
    expect(userDto).toBeTruthy();
  });

  it("should be createUser", async () => {
    const user: UserDto = makeUserDto();

    await service.createUser(user);
    const findUser = await service.getUserByUsername("john.doe");
    const userCreate = await service.userView(findUser);

    expect(userCreate.email).toEqual("john.doe@nomail.com");
    expect(userCreate.firstName).toEqual("John");
    expect(userCreate.lastName).toEqual("Doe");
    expect(userCreate.displayName).toEqual("John Doe");
    expect(userCreate.externalId).toEqual(999);
    expect(userCreate.role).toEqual("commercial");
  });

  it("should be createUser - duplicate username", async () => {
    const user: UserDto = makeUserDto();
    let statuscreateUser = 200;
    try {
      await service.createUser(user);
    } catch (error) {
      statuscreateUser = error.status;
    }
    expect(statuscreateUser).toEqual(406);
  });

  it("should be createUser - duplicate externalId", async () => {
    const user: UserDto = makeUserDto('john.doe.duplicate');
    let statuscreateUser = 200;
    try {
      await service.createUser(user);
    } catch (error) {
      statuscreateUser = error.status;
    }
    expect(statuscreateUser).toEqual(406);
  });

  it("should be getUsers", async () => {
    const users = await service.getUsers();
    const selectInUsersView = await service.userView(users[0]);
    const instanceUser = await service.getUserById(users[0].id);
    const user = await service.userView(instanceUser);

    expect(selectInUsersView.id).toEqual(user.id);
    expect(selectInUsersView.email).toEqual(user.email);
    expect(selectInUsersView.firstName).toEqual(user.firstName);
    expect(selectInUsersView.lastName).toEqual(user.lastName);
    expect(selectInUsersView.displayName).toEqual(user.displayName);
    expect(selectInUsersView.role).toEqual(user.role);
    expect(selectInUsersView.externalId).toEqual(999);
  });

  it("should be patchRole", async () => {
    const users = await service.getUsers();
    const instanceUserPatch = await service.patchRole(
      users[0].id,
      RoleEnum.admin
    );
    const userPatch = await service.userView(instanceUserPatch);

    expect(userPatch.role).toEqual(RoleEnum.admin);
  });
});
