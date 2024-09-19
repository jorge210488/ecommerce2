import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/orders/Orders.entity";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { ProductsRepository } from "src/products/products.repository";
import { UsersRepository } from "src/users/users.repository";
import { OrdersRepository } from "./orders.repository";
import { OrderDetailsRepository } from "./orderDetails.repository";
import { ProductsModule } from "src/products/products.module";
import { UsersModule } from "src/users/users.module";
import { OrderDetail } from "src/orders/OrderDetails.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Order, OrderDetail]), ProductsModule, UsersModule],
    providers: [OrdersService, OrdersRepository, OrderDetailsRepository,],
    controllers: [OrdersController],
})
export class OrdersModule {}