import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Answer } from 'src/app/models/answer.model';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forum-page',
  templateUrl: './forum-page.component.html',
  styleUrls: ['./forum-page.component.css']
})
export class ForumPageComponent implements OnInit {
  post: Post ;
  answers ;
  answerForm:FormGroup ;
  successMessage:string ;
  failedMessage:string ;
  spinner: boolean = false ;
  domain:string = environment.domain ;
  user ;
  constructor(
    private postsSRV: PostService,
    private authSRV: AuthService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.postsSRV.postClicked.subscribe((post:Post) => {
      console.log(post);
      
      this.post = post ;
    })
      this.postsSRV.getAnswers(this.post.id).subscribe(answers => {
        this.answers =  answers ;
      })

    this.answerForm = new FormGroup({
      answer: new FormControl(null, Validators.required)
    })

    this.user = this.authSRV.currentUser ;
  }

  onAddAnswer(){
    if(this.answerForm.valid){
      let newAnswer = new Answer(this.authSRV.currentUser.id, this.post.id,this.answerForm.controls.answer.value) ;
      this.postsSRV.addAnswer(newAnswer) ;
      this.answerForm.setValue({answer:''}) ;
      this.spinner = true ;
      setTimeout(() => {
        this.successMessage = 'Your answer has been posted...' ;
        this.spinner = false ;
        this.postsSRV.getAnswers(this.post.id).subscribe(answers => {
          this.answers =  answers ;
        })
      }, 2500) ;
    }
    else this.failedMessage = "your answer is invalid."
  }

  // input field of new answer was focus - check if user login...
  answerAreaFocus(){
    if(!this.authSRV.currentUser){
      setTimeout(() => {
        this.failedMessage = "You need to login to add your answer..." ;
      }, 1500)
    }
  }

  onLikePress(){
      this.postsSRV.addLike(this.post.id)
  }

  onUserClick(userId: number){
    this.router.navigate(['main', 'otherUserDetails', userId])
  }
}