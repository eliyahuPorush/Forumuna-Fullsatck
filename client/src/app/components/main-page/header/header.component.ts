import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  brand = environment.brand ;
  user: User ;
  spinner: boolean = false ;
  constructor(
    private authSRV: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authSRV.user.subscribe(user => {this.user = user})
    
  }
  onLogout(){
    this.spinner = true ;
    setTimeout(() => {
      this.authSRV.logout() ;
      this.router.navigate(['main','login']) ;
      this.spinner = false ;
    }, 2000) ;
  }

}
