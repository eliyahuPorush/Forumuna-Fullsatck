import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { map } from 'rxjs/operators' ;
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { PrivateMessageService } from './privateMessages.service';
import { PrivateMessage } from '../models/privateMessage.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null) ;
  currentUser: User ;
  domain: string = environment.domain ;
  errorMessage = new Subject<string>();
  constructor(
    private http: HttpClient,
    private router: Router,
    private privateMSGSRV: PrivateMessageService
    ) {
      // get token from local storage if it exists and signin with
      const token = localStorage.getItem('forumuna user token') ;
      if(token){
        this.getUserByToken(token).subscribe(user => {
          this.login(user.email, user['password']).subscribe(() => {
            this.router.navigate([''])
          })
        }) ;
      }
    }
    
    
    login(email: string, password: string){
      return this.http.get<User>(`${this.domain}users/login/${email}/${password}`).pipe(map(
        async data => { 
          localStorage.setItem('forumuna user token',data['token'])  // insert token to local storage
          this.user.next(data) ;
          this.currentUser = data ;
          await this.privateMSGSRV.getUnreadedMessages(data.id) ;

        
      }
    ))
  }

  signup(name:string, email:string, password: string, passwordConfirm: string, image: string | ArrayBuffer){
    let newUser = {
      name,email,password,passwordConfirm,image
    }
    return this.http.post<User>(`${this.domain}users/signup`,newUser).
      pipe(map((user:User) => {
        this.user.next(user);
        this.currentUser = user;
    })) ;
  }
  updateProfile(data) {
    data['id'] = this.currentUser.id ;
    return this.http.post<User>(`${this.domain}users/updateProfile`, data,{
      reportProgress: true,
      observe: 'events',
      headers: {token: this.currentUser['token']}
    }).pipe(map(
      user => {
        this.currentUser = user['body'];
        this.user.next(this.currentUser);
      })
    ) 
  }

  uploadImageProfile(image, userEmail){
      const formData = new FormData();
      formData.append('image', image);
      this.http.post(
        `${this.domain}users/uploadImageProfile/${userEmail}`, 
        formData,  
        { headers: {
            'token': this.currentUser['token'],
          }})
    .subscribe(p => {
        this.currentUser.profileImagePath = p['path'] ;
        this.user.next(this.currentUser) ;
      }) ;
  }
  
  logout() {
    this.user.next(null) ;
    this.currentUser = null ;
    localStorage.removeItem('forumuna user token') ;
    this.router.navigate(['main/login']) ;
  }
  getUserByToken(token: string){
    return this.http.get<User>(`${this.domain}users/getUserByToken/${token}`)
  }


  getOtherUserDetails(userID: number){
    return this.http.get<User>(`${this.domain}users/getOtherUserDetails/${userID}`) ;
  }

}
