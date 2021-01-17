import { IsString } from 'class-validator';
import { RoleEnum } from '../../../interfaces/user.interface';
import { ApiProperty } from '@nestjs/swagger';

export class PatchRoleUserDto {
  @ApiProperty({
    type: String,
    enum: RoleEnum,
    required: true
  })
  @IsString()
  readonly role: RoleEnum;
}
