import { PickType } from "@nestjs/swagger";
import { CreateUserDto } from "src/users/CreateUser.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto extends PickType(CreateUserDto, ['email']) {
    @IsNotEmpty()
    @IsString()
    password: string; 
}
