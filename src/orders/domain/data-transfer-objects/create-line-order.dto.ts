import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateLineOrderDto {
  @IsString()
  @IsUUID(4)
  readonly article: string;
  @IsString()
  readonly referenceArticle: string;
  @IsString()
  readonly descriptionArticle: string;
  @IsNumber()
  readonly quantity: number;
  @IsNumber()
  readonly unitPrice: number;
  @IsNumber()
  readonly discount: number;
}
