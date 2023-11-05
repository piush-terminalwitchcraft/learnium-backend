import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto, LoginDto } from './dto';
@Controller('admin/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto){
        return this.authService.signup(dto);
    }

    @Post('signin')
    signin(@Body() dto: LoginDto){
        console.log(dto)
        return this.authService.signin(dto);
    }

    @Post('google-signin')
    googleSignin(){

    }
}
