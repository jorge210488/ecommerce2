import { PartialType } from "@nestjs/mapped-types";
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsNumber({ maxDecimalPlaces: 2})
    price: number;
  
    @IsNotEmpty()
    @IsInt()
    stock: number;
  
    @IsNotEmpty()
    @IsUUID()
    categoryId: string;
  
    @IsString()
    imgUrl: string;
  }
  
  export class UpdateProductDto extends PartialType(CreateProductDto) {}