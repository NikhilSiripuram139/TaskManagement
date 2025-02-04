import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentials {
    @IsString()
    @MinLength(6)
    @MaxLength(45)
    username:string;

    @IsString()
    @MinLength(8)
    @MaxLength(30)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message:'Password is too weak!'
    })
    password:string;
}