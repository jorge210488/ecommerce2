import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryRepository } from "./cloudinary.repository";
import { CloudinaryController } from "./cloudinary.controller";
import { Product } from "src/products/Products.entity";
import { ProductsModule } from "src/products/products.module";
import { CloudinaryConfig } from "src/config/cloudinary";


@Module({
    imports: [
        TypeOrmModule.forFeature([Product]),
      ],
    providers: [CloudinaryService, CloudinaryRepository, CloudinaryConfig],
    controllers: [CloudinaryController],
})
export class CloudinaryModule {}