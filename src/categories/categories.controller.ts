import { Body, Controller, Get, HttpCode, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AuthGuard } from "src/auth/AuthGuard";
import { CreateCategoryDto } from "./CreateCategory.dto";

@Controller("categories")
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @UseGuards(AuthGuard)
    @HttpCode(201)
    @Post()
    async addCategory(@Body() categoryData: CreateCategoryDto) {
        return this.categoriesService.addCategory(categoryData);
    }

    @Post("sedeer")
    async preloadCategories(){
        return this.categoriesService.preloadCategories();
    }

    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Get()
    async getCategories() {
        return this.categoriesService.getCategories();
    }
}
