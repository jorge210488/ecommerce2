import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import { LoginUserDto } from "./LoginUser.dto";
import { CreateUserDto } from "../users/CreateUser.dto";
import { User } from "../users/Users.entity";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Role } from "./role.enum";

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository: UsersRepository,
      private readonly jwtService: JwtService,
    ) {}

    async getAuth(){
        return "Get Auth";
    }

    async signup(userData: CreateUserDto): Promise<Omit<User, "password">> {
      const userEmail = await this.usersRepository.findEmail(userData.email);
    if (userEmail){
    throw new BadRequestException("Email ya existe");
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    if(!hashedPassword){
    throw new BadRequestException("Password no pudo ser hashed")
    }
      const user = new User();
      user.name = userData.name;
      user.email = userData.email;
      user.password = userData.password;
      user.address = userData.address;
      user.phone = userData.phone;
      user.country = userData.country;
      user.city = userData.city;
      user.isAdmin = userData.isAdmin ?? false;

      return await this.usersRepository.createUser({...user, password:hashedPassword}); 
    }

    async signin(loginUserDto: LoginUserDto): Promise<any> {
      const { email, password } = loginUserDto;
      const user = await this.usersRepository.findEmail(email);
  
      if (!user) {
          throw new BadRequestException('Credenciales incorrectas');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
          throw new BadRequestException('Credenciales incorrectas');
      }

      const userPayload = {
        sub:user.id,
        id:user.id,
        email:user.email,
        roles: [user.isAdmin ? Role.Admin : Role.User],
      }
      const token = this.jwtService.sign(userPayload);
  
      return {
          message: 'Login exitoso',
          user: {
              id: user.id,
              email: user.email,
              name: user.name,
          },
          token,
      };
  }
    
}