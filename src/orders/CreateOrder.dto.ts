import { IsArray, IsNotEmpty, IsUUID, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class ProductIdDto {
  @IsUUID()
  id: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsArray()
  @ArrayNotEmpty({ message: 'La orden debe contener al menos un producto' })
  @ValidateNested({ each: true })
  @Type(() => ProductIdDto)
  products: ProductIdDto[];
}
