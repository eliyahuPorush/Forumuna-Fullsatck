import { IsInt, IsString } from "class-validator";


export class NewForumDto{
    @IsString()
    title: string ;

    @IsString()
    content: string ;

    @IsInt()
    userID: number ;

    @IsString()
    token: string ;
}