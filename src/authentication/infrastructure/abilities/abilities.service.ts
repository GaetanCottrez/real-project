import { Injectable } from '@nestjs/common';
import { Ability, AbilityBuilder, AbilityTuple, MongoQuery } from '@casl/ability';
import { RoleEnum } from '../../../interfaces/user.interface';
import { User } from '../../../users/domain/models/user';

@Injectable()
export class AbilitiesService {

  constructor() {
  }

  async defineAbilityFor(user: User): Promise<Ability> | null {
    if (user) {
      return await this.defineRulesFor(user);
    }
    return null;
  }

  private async defineRulesFor(
    user: User
  ): Promise<Ability<AbilityTuple, MongoQuery>> {
    const { can, cannot, rules } = new AbilityBuilder();
    switch (user.role) {
      case RoleEnum.admin:
        this.defineAdminRules(can, cannot);
        break;
      case RoleEnum.backoffice:
        this.defineBackofficeRules(user, can, cannot);
        break;
      case RoleEnum.commercial:
        this.defineCommercialRules(user, can, cannot);
        break;
      default:
        this.defineCommercialRules(user, can, cannot);
        break;
    }

    // @ts-ignore
    return new Ability(rules);
  }

  private defineAdminRules(can, cannot) {
    can("manage", "all");
  }

  private defineBackofficeRules(user, can, cannot) {
    can("manage", "all");
  }

  private defineCommercialRules(user, can, cannot) {
    can("manage", "all");
  }
}
