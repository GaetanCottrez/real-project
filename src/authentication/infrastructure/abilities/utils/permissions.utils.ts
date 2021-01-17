import { toMongoQuery } from '@casl/mongoose';

export class PermissionScope {

  public readonly ability: any;
  public readonly action: string;
  public readonly subject: string;
  public readonly mongoQuery: string;

  public constructor(ability: any, action: string, subject: string) {
    this.ability = ability;
    this.action = action;
    this.subject = subject;
    const resultMongoQuery = toMongoQuery(this.ability, this.subject, this.action);

    this.mongoQuery = resultMongoQuery?.$or?.[0] ?? {};
  }
}
