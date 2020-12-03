import { Module } from '@nestjs/common';
import { Post } from 'src/entity/post.entity';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Answer } from 'src/entity/answer.entity';
import { User } from 'src/entity/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Answer, User])
  ],
  controllers: [ForumController],
  providers: [ForumService]
})
export class ForumModule {}
