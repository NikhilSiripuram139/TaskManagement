import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthCredentials } from './dto/auth.credentials.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Payload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private readonly usersRepository : UsersRepository,
        private jwtService : JwtService
    ){}

    async signup(userCredentials: AuthCredentials): Promise<void>{
        return this.usersRepository.signup(userCredentials);
    }

    async signin(userCredentials: AuthCredentials): Promise<{ accessToken : string}>{
        const { username, password } = userCredentials;

        const user = await this.usersRepository.findOne({where: {username}});

        if(user && (await bcrypt.compare(password, user.password))){
            const Payload : Payload = { username };
            const accessToken : string = await this.jwtService.sign(Payload);

            return { accessToken };
        }else{
            throw new UnauthorizedException('Please check your login credentials');
        }
    }

}
