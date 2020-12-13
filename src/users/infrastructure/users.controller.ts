import {
  Controller,
  Get,
  Body,
  ValidationPipe,
  Inject,
  UseGuards,
  UseFilters,
  Param,
  HttpException,
  HttpStatus,
  Patch,
  UsePipes, Post,
} from '@nestjs/common';
import { User } from "../domain/models/user";
import { UserDto } from "../domain/data-transfer-objects/user-dto";
import { UsersService } from "../application/users.service";
import { DomainExceptionFilter } from "src/shared/infrastructure/filters/error.filter";
import { ApiBearerAuth, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/authentication/infrastructure/guard/jwt-auth.guard";
import { PatchRoleUserDto } from "../domain/data-transfer-objects/patch-role-user-dto";
import { Abilities } from "src/authentication/infrastructure/guard/abilities.decorator";

@ApiTags("Users")
@ApiBearerAuth()
@Controller("users")
@UseFilters(new DomainExceptionFilter())
export class UsersController {
  constructor(
    @Inject("UsersService") private readonly usersService: UsersService
  ) {
  }

  @Post('')
  async registerNewUser(
    @Body(new ValidationPipe({ transform: true })) user: UserDto
  ) {
    const newUser = User.create(user);
    await this.usersService.createUser(newUser);
    return await this.usersService.userView(newUser);
  }

  @Get("")
  @ApiResponse({ status: 200, description: "Get users" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(JwtAuthGuard)
  @Abilities("Users:read")
  async getUsers(): Promise<UserDto[]> {
    try {
      const users = await this.usersService.getUsers();
      const userDto = [];
      for (const user of users) {
        userDto.push(await this.usersService.userView(user));
      }
      return userDto;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get("roles/:role")
  @ApiResponse({ status: 200, description: "Get users by role" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(JwtAuthGuard)
  @Abilities("Users:read")
  async getUsersByRoles(@Param("role") roles: string): Promise<User[]> {
    try {
      return await this.usersService.getUsers({
        roles: roles.split(",")
      });
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get("roles/:role/entities/:entities")
  @ApiResponse({ status: 200, description: "Get users by role by entities" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(JwtAuthGuard)
  @Abilities("Users:read")
  async getUsersByRolesByEntities(
    @Param("role") roles: string,
    @Param("entities") entities: string
  ): Promise<User[]> {
    try {
      const arrayFormatedUser = [];
      const listUsers = await this.usersService.getUsers({
        roles: roles.split(","),
        entities: entities.split(",")
      });

      for (const user of listUsers) {
        arrayFormatedUser.push(await this.usersService.userView(user));
      }

      return arrayFormatedUser;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get(":id")
  @ApiResponse({ status: 200, description: "Get one user" })
  @ApiResponse({ status: 400, description: "User not found" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(JwtAuthGuard)
  @Abilities("Users:read")
  async findOne(@Param("id") id: string): Promise<UserDto> {
    try {
      const userInstance = await this.usersService.getUserById(id);
      return await this.usersService.userView(userInstance);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch(":id")
  @ApiResponse({ status: 200, description: "Patch user" })
  @ApiResponse({ status: 400, description: "User not found" })
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  @Abilities("Users:patch")
  async patchUser(
    @Param("id") id: string,
    @Body() patchRoleUser: PatchRoleUserDto
  ) {
    try {
      const userWithUpdateRole = await this.usersService.patchRole(
        id,
        patchRoleUser.role
      );
      return await this.usersService.userView(userWithUpdateRole);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST
      );
    }
  }
}
