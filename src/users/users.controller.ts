import { Controller, Get, Post, Put, Delete, HttpCode, Param, Body, UseGuards, Query, Req, Request, BadRequestException, NotFoundException, ParseUUIDPipe, ParseIntPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./Users.entity";
import { AuthGuard } from "src/auth/AuthGuard";
import { CreateUserDto, UpdateUserDto } from "./CreateUser.dto";

@Controller("users")
    export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Get()
       async getUsers(
        @Query('page', ParseIntPipe) page: number, // Recibe el parámetro de query 'page'
        @Query('limit', ParseIntPipe) limit: number // Recibe el parámetro de query 'limit'
      ) {
        const pageNum = page ? page: 1; // Si no recibe 'page', el valor por defecto es 1
        const limitNum = limit ? limit : 5; // Si no recibe 'limit', el valor por defecto es 5
        return await this.usersService.getUsers(pageNum, limitNum);
      }
    
      @UseGuards(AuthGuard)
      @HttpCode(200)
      @Get(':id')
      async getUserById(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.usersService.getUserById(id);
      }

        // @HttpCode(201)
        // @Post()
        // async createUser(@Body() user: CreateUserDto) {
        //     const newUser = await this.usersService.createUser(user);
        //     return newUser;
        // }
        
        @UseGuards(AuthGuard)
        @HttpCode(200)
        @Put(':id')
        async updateUser(
          @Param('id', new ParseUUIDPipe()) id: string,
          @Body() updateData: UpdateUserDto) {
          return await this.usersService.updateUser(id, updateData);
        }
    
        @UseGuards(AuthGuard)
        @HttpCode(200)
        @Delete(':id')
        async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
          return await this.usersService.deleteUser(id);
        }        
}