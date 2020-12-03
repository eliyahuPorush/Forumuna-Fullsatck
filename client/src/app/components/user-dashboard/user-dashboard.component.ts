import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  usersPosts: Post[] ; 
  spinner: boolean = false ;

  constructor(
    private postsSRV: PostService,
    private authSRV: AuthService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postsSRV.getUsersPosts(this.authSRV.currentUser).subscribe( (data:Post[]) => {
      this.usersPosts = data ;
    })
  }
  onDelete(post: Post) {
    if(confirm(`Are you sure you want to delete this post?`)){
      this.postsSRV.deletePost(post.id).subscribe(() =>{
        console.log("post deleted!");
      }) 
            this.spinner = true ;
            setTimeout(() => {
              this.router.navigate(['usersPosts'])
            },1500)
    } 
    
  }

}
