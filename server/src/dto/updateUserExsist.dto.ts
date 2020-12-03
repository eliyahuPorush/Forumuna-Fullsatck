import { IsInt, IsString } from "class-validator";


export class UpdateUserExsist{


    @IsInt()
    id: number ;
    
    @IsString()
    name:string ;

    @IsString()
    email:string ;

    @IsString()
    currentPassword:string ;

    @IsString()
    newPassword: string ;

    image ;
}