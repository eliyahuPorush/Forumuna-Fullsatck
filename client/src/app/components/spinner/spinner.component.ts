import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements AfterViewInit {

  constructor(
    // private router: Router,
    // private postsSRV: PostService
  ) { }
  ngAfterViewInit(): void {
    
    // setTimeout(() =>{
    //   this.router.navigate([this.postsSRV.whereToGo])
    // }, 1500)
  }


}
