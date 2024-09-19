import { Controller, Delete, Get, Post, Put, HttpCode, Param, UseGuards, Body, Query, ParseUUIDPipe } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "src/auth/AuthGuard";
import { Product } from "./Products.entity";
import { CreateProductDto, UpdateProductDto } from "./CreateProduct.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/auth/role.enum";
import { RolesGuard } from "src/auth/RolesGuard";

@Controller("products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService){}

    @HttpCode(200)
    @Get()
        async getProducts(
        @Query('page') page: string,
        @Query('limit') limit: string
        ){
            const pageNum = page ? Number(page): 1;
            const limitNum = limit ? Number(limit): 5;
            return this.productsService.getProducts(pageNum, limitNum);
        }

        @HttpCode(200)
        @Get(":id")
        async getProductById(@Param("id", new ParseUUIDPipe()) id: string) {
            return this.productsService.getProductById(id);
        }
        
        @UseGuards(AuthGuard)
        @Post()
        async createProduct(@Body() productData: CreateProductDto) {
            return this.productsService.createProduct(productData);
        }

        @Post("sedeer")
        async preloadCategories(){
            return this.productsService.preloadProducts();
        }
    
        @HttpCode(200)
        @Put(':id')
        @Roles(Role.Admin)
        @UseGuards(AuthGuard, RolesGuard)
        async updateProduct(
            @Param('id', new ParseUUIDPipe()) id: string,
            @Body() updateData: UpdateProductDto
        ) {
            return this.productsService.updateProduct(id, updateData);
        }
    
        @UseGuards(AuthGuard)
        @HttpCode(200)
        @Delete(':id')
        async deleteProduct(
            @Param('id', new ParseUUIDPipe()) id: string
        ) {
            return this.productsService.deleteProduct(id);
        }    
}