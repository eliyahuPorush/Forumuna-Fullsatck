import { IsString } from "class-validator";


export class NewUserSignupDto{
    @IsString()
    name:string ;

    @IsString()
    email:string ;

    @IsString()
    password:string ;

    image ;
}