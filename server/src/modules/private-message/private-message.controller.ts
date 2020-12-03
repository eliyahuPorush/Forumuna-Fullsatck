import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { messageDto } from 'src/dto/newMessage.dto';
import { PrivateMessageService } from './private-message.service';

@Controller('private-message')
export class PrivateMessageController {

    constructor(private messageSRV: PrivateMessageService){}

    @Post('add')
    addMessage(@Body() newMessage: messageDto){
        this.messageSRV.addMessage(newMessage) ;
    }

    @Get('getMessagesUnread/:userId')
    getMessagesUnread(@Param('userId') userId: number){
        return this.messageSRV.getMessagesUnread(userId) ;
    }

    @Get('getAllMessages/:userId')
    getAllMessages(@Param('userId') userId: number){
        return this.messageSRV.getAllMessages(userId)
    }
    


    @Put('setAllMessageReaded/:userId')
    setAllMessageReaded(@Param('userId') userId: number){
        this.messageSRV.setAllMessagesReaded(userId) ;
    }






}
