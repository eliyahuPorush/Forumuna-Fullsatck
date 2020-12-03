import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { messageDto } from 'src/dto/newMessage.dto';
import { PrivateMessage } from 'src/entity/privateMessage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PrivateMessageService {

    constructor(
        @InjectRepository(PrivateMessage) private privateMessageRepository: Repository<PrivateMessage>
    ){}

    addMessage(newMessage: messageDto){
        const {senderId, receiverId, messageContent} = newMessage ;
        const message = new PrivateMessage() ;
        message.sender = senderId ;
        message.receiver = receiverId ;
        message.messageContent = messageContent ;
        this.privateMessageRepository.save(message) ;
    }

    getMessagesUnread(userId: number){
        return this.privateMessageRepository.find({relations: ['receiver'], where: {receiver: userId, receiverWatch: false}})
    }

    getAllMessages(userId: number){
        return this.privateMessageRepository.find({relations:['sender'] , where: {receiver: userId}})
    }

    setAllMessagesReaded(userId: number){
        this.privateMessageRepository.find({where: {receiver: userId}}).then(message =>
            {
                for(let m of message){
                    m.receiverWatch = true ;
                    this.privateMessageRepository.save(m)
                }
            })
    }
}
