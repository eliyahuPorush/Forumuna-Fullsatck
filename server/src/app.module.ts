import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UsersModule } from './modules/users/users.module';
import { ForumModule } from './modules/forum/forum.module';
import { User } from './entity/user.entity';
import { Post } from './entity/post.entity';
import { Answer } from './entity/answer.entity';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { PrivateMessageModule } from './modules/private-message/private-message.module';
import { PrivateMessage } from './entity/privateMessage.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(
      {
        "type": "postgres",
        "host": "localhost",
        "port": 5432,
        "username": "postgres",
        "password": "eliyahu",
        "database": "forumuna",
        "synchronize": true,
        "logging": false,
        "entities": [User, Post, Answer, PrivateMessage],
        "migrations": [
           "src/migration/**/*.ts"
        ],
        "subscribers": [
           "src/subscriber/**/*.ts"
        ],
        "cli": {
           "entitiesDir": "src/entity",
           "migrationsDir": "src/migration",
           "subscribersDir": "src/subscriber"
        }
     }
    ), UsersModule, ForumModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','..', 'images'),
      renderPath: join(__dirname, '..','..', 'images', 'user-default.png')
    })
    ,
    ConfigModule.forRoot(),
    PrivateMessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule  {
   constructor(private connection: Connection) {
   }
}
