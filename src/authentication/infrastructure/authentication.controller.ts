import { Controller, Inject, Post, Request, UseFilters, UseGuards } from '@nestjs/common';
import { DomainExceptionFilter } from '../../shared/infrastructure/filters/error.filter';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthentificationService } from '../application/authentification.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("Auth")
@Controller("auth")
@UseFilters(new DomainExceptionFilter())
export class AuthenticationController {
  constructor(
    @Inject("AuthentificationService") private readonly authentificationService: AuthentificationService
  ) {
  }

  @Post("login")
  @ApiResponse({ status: 201, description: "return created token" })
  @ApiResponse({ status: 401, description: "Unauthorized" })
  @UseGuards(AuthGuard("local"))
  async login(@Request() req) {
    return this.authentificationService.login(req.user);
  }
}
