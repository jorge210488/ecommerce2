import { Controller, Param, Get, HttpCode, Post, Body, ParseUUIDPipe, UseGuards } from "@nestjs/common";
import { OrderResponse, OrdersService } from "./orders.service";
import { CreateOrderDto} from "./CreateOrder.dto";
import { AuthGuard } from "src/auth/AuthGuard";


@Controller("orders")
export class OrdersController {
    constructor (private readonly ordersService: OrdersService) {}

    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Get(":id")
    async getOrderById(@Param("id", new ParseUUIDPipe()) id: string) {
        return this.ordersService.getOrderById(id);
    }
    @UseGuards(AuthGuard)
    @HttpCode(201)
        @Post()
    async addOrder(@Body() orderData: CreateOrderDto): Promise<OrderResponse> {
          return this.ordersService.addOrder(orderData);
        }
}