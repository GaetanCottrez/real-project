import { Test, TestingModule } from '@nestjs/testing';
import { RoleEnum } from '../../interfaces/user.interface';
import { User } from '../../users/domain/models/user';
import { UserDto } from '../../users/domain/data-transfer-objects/user-dto';
import { AbilitiesService } from '../infrastructure/abilities/abilities.service';

describe("AbilitiesService", () => {
  let module: TestingModule;
  let abilitiesService: AbilitiesService;
  let abilitiesCommercial;
  let abilitiesBackoffice;
  let abilitiesAdmin;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
      ],
      providers: [AbilitiesService]
    }).compile();

    abilitiesService = module.get<AbilitiesService>(AbilitiesService);

    abilitiesCommercial = await abilitiesService.defineAbilityFor(
      User.create({
        externalId: 999,
        username: "john.doe",
        password: "AA!45aaa",
        firstName: "John",
        lastName: "Doe",
        displayName: "John Doe",
        email: "john.doe@nomail.com",
        role: RoleEnum.commercial
      } as UserDto)
    );

    abilitiesBackoffice = await abilitiesService.defineAbilityFor(
      User.create({
        externalId: 888,
        username: "backoffice",
        password: "AA!45olfk56",
        firstName: "backoffice",
        lastName: "backoffice",
        displayName: "backoffice backoffice",
        email: "backoffice@nomail.com",
        role: RoleEnum.backoffice
      } as UserDto)
    );

    abilitiesAdmin = await abilitiesService.defineAbilityFor(
      User.create({
        externalId: 777,
        username: "admin",
        password: "AA!45bbb32",
        firstName: "admin",
        lastName: "admin",
        displayName: "admin admin",
        email: "admin@nomail.com",
        role: RoleEnum.admin
      } as UserDto)
    );
  });

  afterAll(async done => {
    done();
  });

  it("should be defined", async () => {
    expect(abilitiesService).toBeDefined();
  });

  it("Abilities Users for Abilities Admin", async () => {

  });

  it("Abilities Projects for Abilities Commercial", async () => {

  });

  it("Abilities Users for Abilities CISO", async () => {

  });

  it("Abilities Projects for Abilities Backoffice", async () => {

  });

  it("Abilities Projects for Abilities Commercial", async () => {

  });

  it("Abilities Users for Abilities Backoffice", async () => {

  });
});
