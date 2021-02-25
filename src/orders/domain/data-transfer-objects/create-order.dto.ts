import { RoleEnum, typeAccountUserEnum } from '../../../interfaces/user.interface';
import { IsArray, IsEnum, IsNumber, IsString, IsUUID } from 'class-validator';
import { CreateLineOrderDto } from './create-line-order.dto';
import { ApiProperty } from '@nestjs/swagger';


export class CreateOrderDto {
  @ApiProperty({
    type: String,
    enum: typeAccountUserEnum,
    required: true
  })
  @IsString()
  @IsEnum(typeAccountUserEnum)
  readonly typeAccountUser: typeAccountUserEnum;
  @ApiProperty({
    type: String,
    required: true
  })
  @IsString()
  readonly temporaryDocNumber: string;
  @ApiProperty({
    type: String,
    required: true
  })
  @IsString()
  @IsUUID(4)
  readonly customerId: string;
  @ApiProperty({
    type: String,
    required: true
  })
  @IsString()
  readonly deliveryInstructions: string;
  @ApiProperty({
    type: String,
    required: true
  })
  @IsString()
  @IsUUID(4)
  readonly commercialId: string;
  @ApiProperty({
    type: String,
    required: true
  })
  @IsString()
  readonly yourReference: string
  @ApiProperty({
    type: Number,
    required: true
  })
  @IsNumber()
  readonly shippingFees: number;
  @ApiProperty({
    type: String,
    required: true
  })
  @IsString()
  @IsUUID(4)
  readonly deliveryAddressId: string;
  @ApiProperty({
    type: Array,
    required: true
  })
  @IsArray()
  readonly lines?: CreateLineOrderDto[]
}
