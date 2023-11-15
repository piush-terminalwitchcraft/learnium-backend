import { ForbiddenException, Injectable} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {

  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}

  async signup(dto: AuthDto) {

    try{

      // generate the password hash 
      const hash = await  argon.hash(dto.password); 
      // save the user in Db 
      const user = await this.prisma.user.create(
        {
          data: {
            userEmail: dto.email,
            userName: dto.name, 
            userPassword: hash, 
            userProfilePicture: '',
            userPhoneNo: '',
            isStudent: false,
          }
        }
      )

      // return the saved user 
      return this.signToken(user.userID, user.userEmail, user.isStudent);
    } catch (error){
      if( error instanceof PrismaClientKnownRequestError) {
        if(error.code === 'P2002'){
          throw new ForbiddenException('Credentials taken')
        } else {
          throw error;
        }
      }
      throw error;
    }
  }

  async signin(dto: LoginDto){
    try{
      // find user by email 
      const user = await this.prisma.user.findUnique({
        where:{
          userEmail: dto.email,
        }
      }); 

      if(!user) throw new ForbiddenException("Credentials incorrect")

      // compare password 
      const passwordMatches = await argon.verify(user.userPassword, dto.password); 

      if(!passwordMatches) throw new ForbiddenException("Credentials incorrect")

      return this.signToken(user.userID, user.userEmail, user.isStudent);
    } catch(error) {
      throw error; 
    }
  }

  async signToken(userID: string, userEmail: string, isStudent: boolean): Promise<{access_token:string}>{
    const payload = {
      sub: userID,
      userEmail,
      isStudent
    }
    
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn:"15000m",
      secret: this.config.get('JWT_SECRET'),
    })

    return {
      access_token: token,
    }
  }



}
