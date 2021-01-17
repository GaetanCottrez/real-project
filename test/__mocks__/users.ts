export default async (db) => {
  await db.collection('Users').remove({});
  await db.collection('Users').insertMany(MockUsers).then(r => r);
};

const MockUsers = [
  {
    "id" : "06e2e15e-745b-47cc-a9cb-bfb6f1ff4387",
    "externalId" : 999,
    "username" : "gaetan",
    "password" : "$2b$10$bOVIebU55R7q4ojwD0HBR.B/Z7nQqBEG0D816qyRO5geypKdHdgse",
    "firstName" : "Gaëtan",
    "lastName" : "Cottrez",
    "displayName" : "Gaëtan Cottrez",
    "email" : "gaetan@apprendre-la-programmation.net",
    "accounts" : [],
    "role" : "admin"
  }
];
