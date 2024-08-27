import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentials } from './dto/auth.credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService){}

    @Post('/signup')
    signUp(@Body() userCredentials: AuthCredentials): Promise<void>{
        return this.authService.signup(userCredentials);
    }

    @Post('/signin')
    signIn(@Body() userCredentials: AuthCredentials): Promise<{ accessToken : string}>{
        return this.authService.signin(userCredentials);
    }
}
