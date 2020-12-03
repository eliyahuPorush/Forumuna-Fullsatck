import { Controller, Get, Body, Post, UseGuards, Delete, Param } from '@nestjs/common';
import { NewAnswerDto } from 'src/dto/newAnswer.dto';
import { NewForumDto } from 'src/dto/newForum.tdo';
import { AuthGuard } from 'src/guard/auth.guard';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {

    constructor(
        private forumSRV: ForumService
        ){}

    @Post('addNewForum')
    @UseGuards(AuthGuard)
    addForum(@Body() newForum: NewForumDto){
        this.forumSRV.addForum(newForum)
    }

    @Get('getPosts')
    getForums(){
        return this.forumSRV.getForums()
    }
    @Post('addAnswer')
    @UseGuards(AuthGuard)
    addAnswer(@Body() newAnswer: NewAnswerDto){
        console.log('answer: ', newAnswer);
        
        this.forumSRV.addAnswer(newAnswer)
    }

    @Get('getUserPosts/:userID')
    @UseGuards(AuthGuard)
    getUserPosts(@Param('userID') userID: number){
        return this.forumSRV.getUserPosts(userID)
    }

    @Delete('deletePost/:postID')
    @UseGuards(AuthGuard)
    deletePost(@Param('postID') postID: number){
        this.forumSRV.deletePost(postID);
    }

    @Get('getAnswers/:postID')
    getAnswers(@Param('postID') postID: number){
        return this.forumSRV.getAnswers(postID)
    }

    @Post('addLike')
    @UseGuards(AuthGuard)
    addLike(@Body() postId){
        return this.forumSRV.addLike(postId['postId'])
    }
}
