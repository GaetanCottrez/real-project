import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../../../interfaces/user.interface';
import { PermissionScope } from '../abilities/utils/permissions.utils';
import { Filter } from '../abilities/utils/filters.utils';

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  private scopesRouting = [];
  private abilitiesRouting = [];
  private user;

  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    this.abilitiesRouting = [];
    this.scopesRouting = this.reflector.get<string[]>(
      "abilities",
      context.getHandler()
    );
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    this.user = user;
    if (err || !this.user.data) {
      throw err || new UnauthorizedException("Unauthorized");
    }

    this.user.filtersMongo = {};

    if (!this.scopesRouting) {
      return this.user;
    }
    if (this.user.data.role !== RoleEnum.admin) {
      this.formatAbilitiesRouting();
      this.matchAbilities(this.user.abilities);
    }

    return this.user;
  }

  private formatAbilitiesRouting() {
    this.scopesRouting.forEach(scope => {
      const subject = scope.split(":")[0];
      const userAction = scope.split(":")[1];
      this.abilitiesRouting.push({ userAction, subject });
    });
  }

  private buildMongoQuery(abilities: any, action: string, subject: string) {
    const scopes = [
      new PermissionScope(abilities, action, subject)
    ];

    return new Filter(scopes).buildMongoQuery();
  }

  private matchAbilities(abilitiesUser) {
    this.abilitiesRouting.forEach(ability => {
      if (!abilitiesUser.can(ability.userAction, ability.subject)) {
        throw new UnauthorizedException(`Unauthorized : abilities {${ability.userAction}, ${ability.subject}} invalid`);
      }
      this.user.filtersMongo = this.buildMongoQuery(abilitiesUser, ability.userAction, ability.subject);
    });
  }
}
