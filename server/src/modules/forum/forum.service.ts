import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewAnswerDto } from 'src/dto/newAnswer.dto';
import { NewForumDto } from 'src/dto/newForum.tdo';
import { Answer } from 'src/entity/answer.entity';
import { Post } from 'src/entity/post.entity';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ForumService {
    
    constructor(
        @InjectRepository(Post) private postRepository: Repository<Post>,
        @InjectRepository(Answer) private answerRepository: Repository<Answer>,
        @InjectRepository(User) private userRepository: Repository<User>,

        ) { }
        
        getForums() {
            return this.postRepository.find({
                relations: ['user']
            })
        }
        deletePost(id: number) {
            this.postRepository.delete(id)
        }
        async getUserPosts(userID: number) {
            return await this.postRepository.find({
                relations: ["user"],
                where: {user: {id: userID}}
            })
            
        }
        async addForum(newForum: NewForumDto) {
            const newForumRow = new Post();
            const {title, content, userID} = newForum ;
            newForumRow.title = title;
            newForumRow.content = content;
            newForumRow.user = userID ;
            await this.postRepository.save(newForumRow).then(async () => {
                const user = await this.userRepository.findOne(userID) ;
                user.numberOfPosts ++ ;
                this.userRepository.save(user) ;
            });
        }
        
        async addAnswer(newAnswer: NewAnswerDto) {
            const {user_id, post_id, content} = newAnswer ;
            const answer = new Answer() ;
            answer.post = post_id ;
            answer.user = user_id ;
            answer.content = content ;
            
            await this.answerRepository.save(answer).then(() => console.log("new answer added")) ;
        }
        
        async getAnswers(postID: number){
            return await this.answerRepository.find({
                relations: ["post", "user"],
                where: {post: {id: postID}}
            })
        }
        addLike(postId: any) {
            return this.postRepository.findOne(postId).then(post => {
                post.likes ++ ;
                this.postRepository.save(post) ;
            })
        }


    }
    