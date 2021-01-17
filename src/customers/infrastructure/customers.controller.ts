import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Patch,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { DomainExceptionFilter } from 'src/shared/infrastructure/filters/error.filter';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/infrastructure/guard/jwt-auth.guard';
import { Abilities } from 'src/authentication/infrastructure/guard/abilities.decorator';
import { CustomersService } from '../application/customers.service';
import { CustomerDto } from '../domain/data-transfer-objects/customer-dto';
import { PatchRoleUserDto } from '../../users/domain/data-transfer-objects/patch-role-user-dto';
import { DeliveryAddressDto } from '../domain/data-transfer-objects/delivery-address-dto';

@ApiTags('Customers')
@ApiBearerAuth()
@Controller('customers')
@UseFilters(new DomainExceptionFilter())
export class CustomersController {
  constructor(
    @Inject('CustomersService')
    private readonly customersService: CustomersService,
  ) {}

  @Get('')
  @ApiResponse({ status: 200, description: 'Get customers' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Abilities('Customers:read')
  async getCustomers(): Promise<CustomerDto[]> {
    try {
      const customers = await this.customersService.getCustomers();

      const customersDto = [];
      for (const customer of customers) {
        customersDto.push(this.customersService.customerView(customer));
      }

      return customersDto;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one customer' })
  @ApiResponse({ status: 400, description: 'Customers not found' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Abilities('Customers:read')
  async findOne(@Param('id') id: string): Promise<CustomerDto> {
    try {
      const customerInstance = await this.customersService.getCustomerById(id);
      return this.customersService.customerView(customerInstance);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id/delivery_address')
  @ApiResponse({ status: 200, description: 'Patch delivery address customer' })
  @ApiResponse({ status: 400, description: 'Customers not found' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Abilities('Customers:patch')
  async patchDeliveryAddress(
    @Param('id') id: string,
    @Body() patchDeliveryAddress: DeliveryAddressDto,
  ): Promise<CustomerDto> {
    try {
      const customerInstance = await this.customersService.addDeliveryAddress(
        id,
        patchDeliveryAddress,
      );
      return this.customersService.customerView(customerInstance);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
