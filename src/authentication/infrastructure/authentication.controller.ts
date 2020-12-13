import {
  Controller,
  Post,
  Inject,
  UseGuards,
  Request,
  UseFilters,
  Redirect,
  HttpException,
  HttpStatus, Get
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { DomainExceptionFilter } from "../../shared/infrastructure/filters/error.filter";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthentificationService } from "../application/authentification.service";
import { LocalAuthGuard } from './guard/local-auth.guard';

@ApiTags("Auth")
@Controller("auth")
@UseFilters(new DomainExceptionFilter())
export class AuthenticationController {
  constructor(
    @Inject("AuthentificationService") private readonly authentificationService: AuthentificationService
  ) {
  }

  @Post("login")
  @ApiResponse({ status: 200, description: "call redirect microsoft" })
  @ApiResponse({ status: 400, description: "Error call redirect microsoft" })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authentificationService.login(req.user);
  }
}
