import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UsersController } from 'src/controllers/users/users.controller';
import { User } from 'src/entity/user.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        MulterModule.register({
          dest: './images',
        })
    ],
    providers: [AuthService],
    controllers: [UsersController],
    exports: [TypeOrmModule]
})
export class UsersModule {}
