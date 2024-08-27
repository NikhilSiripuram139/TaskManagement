import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersRepository } from "./users.repository";
import { Payload } from "./jwt-payload.interface";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private usersRepository : UsersRepository){
        super({
            secretOrKey : 'topSecret51',
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payLoad : Payload): Promise<User> {
        const {username} = payLoad;

        const user = await this.usersRepository.findOne({where: { username }});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }

}