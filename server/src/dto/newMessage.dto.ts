import { IsInt, IsString } from "class-validator";

export class messageDto {

    @IsInt()
    senderId: number;

    @IsInt()
    receiverId: number;

    @IsString()
    messageContent: string;
}