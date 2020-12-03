import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateMessage } from 'src/entity/privateMessage.entity';
import { PrivateMessageController } from './private-message.controller';
import { PrivateMessageService } from './private-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateMessage])],
  controllers: [PrivateMessageController],
  providers: [PrivateMessageService]
})
export class PrivateMessageModule {}
