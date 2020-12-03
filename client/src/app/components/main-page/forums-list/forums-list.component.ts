import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';


@Component({
  selector: 'app-forums-list',
  templateUrl: './forums-list.component.html',
  styleUrls: ['./forums-list.component.css']
})
export class ForumsListComponent implements OnInit {
  posts: Post[] ;
  user: User ;

  constructor(
    private postsSRV: PostService,
    private router: Router,
    private authSRV: AuthService
    ) { }

  ngOnInit(): void {
    this.postsSRV.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts.reverse() ;
    }); 
    this.user = this.authSRV.currentUser ;
  }
  PostClicked(post){
    this.postsSRV.postClicked.next(post) ;
    this.router.navigate(['main','forum', post.title])
  }

}
