import { IsObject, IsOptional, IsString } from 'class-validator';
import { typeAccountUser } from '../models/typeAccountUser';

export class ChangeDetailsUserDto {
  @IsOptional()
  @IsString()
  readonly firstName: string;
  @IsOptional()
  @IsString()
  readonly displayName: string;
  @IsOptional()
  @IsString()
  readonly lastName: string;
  @IsOptional()
  @IsString()
  readonly email: string;
  @IsOptional()
  @IsObject()
  readonly accounts: typeAccountUser[];
}
