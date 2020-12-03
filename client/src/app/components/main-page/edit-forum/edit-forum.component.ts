import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-edit-forum',
  templateUrl: './edit-forum.component.html',
  styleUrls: ['./edit-forum.component.css']
})
export class EditForumComponent implements OnInit {
  editForumForm: FormGroup;
  user: User ;
  errorMessage: string ;
  constructor(
    private authSRV: AuthService,
    private postsSRV: PostService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editForumForm = new FormGroup({
      title: new FormControl(null),
      content: new FormControl(null)
    }) ;
    this.authSRV.user.subscribe(user => this.user = user) ;
  }
  onSubmit(){
    let newForum = new Post(
      this.editForumForm.controls.title.value,
      this.editForumForm.controls.content.value, 
      this.user.id
      ) ;
      this.postsSRV.addNewPost(newForum).
        subscribe(
          () => {
            this.errorMessage = "A new post is on the air!" ;
            setTimeout(() => {
            this.router.navigate([""]) ;
            }, 2000) ;
          }
          )
  }

}
