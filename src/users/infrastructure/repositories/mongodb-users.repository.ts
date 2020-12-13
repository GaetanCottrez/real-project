import { Injectable } from "@nestjs/common";
import { IUsersRepository } from "../../domain/repositories/users-repository";
import { User } from "../../domain/models/user";
import MongoDbRepository from "../../../database/mongodb/MongoDbRepository.repository";
import { UserDto } from "../../domain/data-transfer-objects/user-dto";
import { createInstanceService } from "../../../shared/application/createInstance.service";

@Injectable()
export class MongodbUsersRepository implements IUsersRepository {
  private mongoClient = new MongoDbRepository();
  private nameCollection = "Users";

  constructor(db = null) {
    console.log(db)
    if(db != null){
      this.mongoClient.database = db
    }
  }

  async fromDatabase(user: UserDto): Promise<User> {
    return createInstanceService.user(user);
  }

  async getUsers(filters: object = {}): Promise<User[]> {
    let match = {};

    if (filters["roles"]) {
      match["role"] = { $in: filters["roles"] };
    }

    return await this.find(match);
  }

  async userView(user: User): Promise<UserDto> {
    return user.asDTO();
  }

  async getUserByUsername(username: string): Promise<User> | null {
    return await this.findOne({ username });
  }

  async getUserById(id: string): Promise<User> {
    return await this.findOne({ id: id });
  }

  private async find(match: object) {
    let pipeline: Array<any> = [
      {
        $match: match
      },
      {
        $project: {
          _id: 1,
          id: 1,
          external_id: 1,
          username: 1,
          firstName: 1,
          lastName: 1,
          password: 1,
          displayName: 1,
          email: 1,
          role: 1,
          accounts: 1
        }
      },
    ];

    let users = await this.mongoClient.database
      .collection(this.nameCollection)
      .aggregate(pipeline)
      .toArray();
    const usersFormatted: User[] = [];
    for (const user of users) {
      if (!user.entity) {
        user.entity = {};
      }
      usersFormatted.push(await this.fromDatabase(user as UserDto));
    }
    return usersFormatted;
  }

  private async findOne(match: object): Promise<User> | null {
    const users = await this.find(match);

    if (users.length > 0) {
      return users[0];
    } else {
      return null;
    }
  }

  async save(user: User): Promise<void> {
    const userForMongo = await this.toDatabase(user);
    await this.mongoClient.database
      .collection(this.nameCollection)
      .replaceOne({ id: userForMongo.id }, userForMongo, { upsert: true });
  }

  async toDatabase(user: User): Promise<UserDto> {
    const userDto = await this.userView(user);
    let userToDatabase = {};

    for (const [key, value] of Object.entries(userDto)) {
      userToDatabase[key] = value;
    }

    return userToDatabase as UserDto;
  }
}
