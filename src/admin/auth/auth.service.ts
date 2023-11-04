import { Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'

@Injectable({})
export class AuthService {

    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDto) {
        console.log(dto);
        // generate the password hash 
        const hash = await  argon.hash(dto.password); 
        // save the user in Db 
        const user = await this.prisma.admin.create({
          data: {
            adminEmail: dto.email,
            adminName: dto.name, 
            adminPassword: hash, 
            rootUser: false,
        
          }
        })
      
        // return the saved user 
        return user;
    }

    async signin(dto: AuthDto){
        return {message: 'signin'};
    }



}
