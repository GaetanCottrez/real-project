import { MongoClient } from 'mongodb';

export default class MongoDbRepository {
  public database;

  public constructor() {
    this.connect().then(r => r);
  }

  public async connect() {
    const mongoClient = await MongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true, });
    this.database = mongoClient.db();
  }
}
