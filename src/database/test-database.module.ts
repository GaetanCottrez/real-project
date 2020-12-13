const MongoClient = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const mongod = new MongoMemoryServer();

module.exports.connect = async () => {
  const uri = await mongod.getUri();

  await MongoClient.connect(uri, { useUnifiedTopology: true });
}

module.exports.closeDatabase = async () => {
  await mongod.stop();
}

module.exports.clearDatabase = async () => {
  const collections = MongoClient.db.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}
