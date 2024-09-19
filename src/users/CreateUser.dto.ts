import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString, Length, matches, Matches, Validate, ValidateIf } from "class-validator";
import { MatchPassword } from "../decorators/match.decorator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 80)
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]/, {
        message: 'El Password debe contener al menos una letra minúscula, una letra mayúscula, un número y uno de los siguientes caracteres especiales: !@#$%^&*',
    })
    password: string;

    // ? valida directamente dentro del DTO
    @IsNotEmpty()
    @Validate(MatchPassword, ['password']) // <- es el DTO password
    confirmPassword: string;


    @IsString()
    @Length(3, 80)
    address: string;
    
    @IsNotEmpty()
    @IsInt()
    phone: number;

    @IsString()
    @Length(5, 20)
    country?: string;

    @IsString()
    @Length(5, 20)
    city?: string;

    @IsOptional()
    isAdmin: boolean;
}
 
export class UpdateUserDto extends PartialType(CreateUserDto) {}