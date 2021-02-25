import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { DomainExceptionFilter } from 'src/shared/infrastructure/filters/error.filter';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/infrastructure/guard/jwt-auth.guard';
import { Abilities } from 'src/authentication/infrastructure/guard/abilities.decorator';
import { OrdersService } from '../application/orders.service';
import { OrderDto } from '../domain/data-transfer-objects/order.dto';
import { CreateOrderDto } from '../domain/data-transfer-objects/create-order.dto';

@ApiTags('Orders')
@ApiBearerAuth()
@Controller('orders')
@UseFilters(new DomainExceptionFilter())
export class OrdersController {
  constructor(
    @Inject('OrdersService')
    private readonly ordersService: OrdersService,
  ) {}

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get one order' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Abilities('Orders:read')
  async getOrderById(@Param('id') id: string): Promise<OrderDto> {
    try {
      return await this.ordersService.getOneOrder(id);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('')
  @ApiResponse({ status: 200, description: 'create orders successfully' })
  @ApiResponse({ status: 400, description: 'Error in create order' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @UseGuards(JwtAuthGuard)
  @Abilities('Orders:add')
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
    try {
      const orderInstance = await this.ordersService.create(createOrderDto);
      return this.ordersService.orderView(orderInstance);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
