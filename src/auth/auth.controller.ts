import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./LoginUser.dto";
import { CreateUserDto } from "src/users/CreateUser.dto";

@Controller("auth")
export class AuthController {
    constructor (private readonly authService: AuthService){}

    @HttpCode(200)
    @Get()
    async getAuth() {
        return await this.authService.getAuth(); 
    }

    @HttpCode(201)
    @Post('signup')
    async signup(@Body() user:CreateUserDto){
        const newUser = await this.authService.signup(user);
        return newUser;
    }

    @HttpCode(201)
    @Post('signin')
    async signin(@Body() loginUser: LoginUserDto) {
        return await this.authService.signin(loginUser);
    }
    
}