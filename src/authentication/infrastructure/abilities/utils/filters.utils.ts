import { PermissionScope } from './permissions.utils';

export class Filter {
  private scopes: PermissionScope[];

  public constructor(
    scopes: PermissionScope[]
  ) {
    this.scopes = scopes;
  }

  public buildMongoQuery(): any {
    const mongoQuery: any = {};
    mongoQuery.$and = [];
    const arrayOr = [];
    this.scopes.forEach(scope => {
      const keyMongoQuery = Object.keys(scope.mongoQuery);
      keyMongoQuery.forEach((value, index) => {
        const objectOr = {};
        objectOr[keyMongoQuery[index]] = scope.mongoQuery[value];
        arrayOr.push(objectOr);
      });
    });

    if (arrayOr.length !== 0) {
      mongoQuery.$and.push({
        $or: arrayOr
      });
    }

    if (!mongoQuery.$and.length) delete mongoQuery.$and;
    return mongoQuery;
  }
}
