import { IsInt, IsString } from "class-validator";


export class NewAnswerDto{
    
    
    @IsInt()
    user_id: number ;

    @IsInt()
    post_id: number ; 

    @IsString()
    content: string ;
}