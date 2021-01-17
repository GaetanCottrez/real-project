import { Db, MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ArticlesService } from '../application/articles.service';
import { MongodbArticlesRepository } from '../infrastructure/repositories/mongodb-articles.repository';
import MockArticles from '../../../test/__mocks__/articles';

describe('ArticlesService', () => {
  let service: ArticlesService;
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
    await MockArticles(db);

    service = new ArticlesService(new MongodbArticlesRepository(db));
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

  it('should be getArticles and getArticleById', async () => {
    const articles = await service.getArticles();
    const selectInArticlesView = await service.articleView(articles[5]);
    const instanceArticle = await service.getArticleById(articles[5].id);
    const oneArticle = await service.articleView(instanceArticle);

    expect(selectInArticlesView.reference).toEqual(oneArticle.reference);
    expect(selectInArticlesView.description).toEqual(oneArticle.description);
    expect(selectInArticlesView.familyCode).toEqual(oneArticle.familyCode);
    expect(selectInArticlesView.warranty).toEqual(oneArticle.warranty);
    expect(selectInArticlesView.weightUnit).toEqual(oneArticle.weightUnit);
    expect(selectInArticlesView.weight).toEqual(oneArticle.weight);
    expect(selectInArticlesView.weightNet).toEqual(oneArticle.weightNet);

    expect(selectInArticlesView.weightGross).toEqual(oneArticle.weightGross);
    expect(selectInArticlesView.priceBuy).toEqual(oneArticle.priceBuy);
    expect(selectInArticlesView.priceSell).toEqual(oneArticle.priceSell);
    expect(selectInArticlesView.priceIncludedTaxes).toEqual(
      oneArticle.priceIncludedTaxes,
    );
    expect(selectInArticlesView.statusLine1).toEqual(oneArticle.statusLine1);
    expect(selectInArticlesView.statusLine2).toEqual(oneArticle.statusLine2);

    expect(selectInArticlesView.barcode).toEqual(oneArticle.barcode);
    expect(selectInArticlesView.country).toEqual(oneArticle.country);
    expect(selectInArticlesView.categories.length).toEqual(
      oneArticle.categories.length,
    );
    expect(selectInArticlesView.exceptions.length).toEqual(
      oneArticle.exceptions.length,
    );

    expect(selectInArticlesView.exceptions[0]).toHaveProperty('reference');
    expect(selectInArticlesView.exceptions[0]).toHaveProperty('category');
    expect(selectInArticlesView.exceptions[0]).toHaveProperty('priceSell');
    expect(selectInArticlesView.exceptions[0]).toHaveProperty(
      'referenceCustomer',
    );

    expect(selectInArticlesView.categories[0]).toHaveProperty('reference');
    expect(selectInArticlesView.categories[0]).toHaveProperty('category');
    expect(selectInArticlesView.categories[0]).toHaveProperty('priceSell');
    expect(selectInArticlesView.categories[0]).toHaveProperty(
      'referenceCustomer',
    );
  });
});
