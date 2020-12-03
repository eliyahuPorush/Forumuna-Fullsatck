import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Answer } from '../models/answer.model';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  postClicked = new BehaviorSubject<Post>(null);
  domain: string = environment.domain ;
  
  constructor(
    private http: HttpClient,
    private authSRV: AuthService
    ) { }
    
    
    getAnswers(postId: number) {
      return this.http.get(`${this.domain}forum/getAnswers/${postId}`).pipe(map(answers => this.addDomainToImagePath(answers))) ;
    }
    
    getPosts(){
      return this.http.get(`${this.domain}forum/getPosts`).pipe(map(posts =>  this.addDomainToImagePath(posts)))
    }
    getUsersPosts(user: User){
      return this.http.get(`${this.domain}forum/getUserPosts/${user.id}`, { headers: {'token': this.getToken()}})
    }
    addAnswer(answer: Answer) {
      this.http.post(`${this.domain}forum/addAnswer`, answer, {headers: {'token': this.getToken()}}).subscribe(response => console.log("res: ", response))  ;
    }
    
    
    addNewPost(newForum: Post){
      return this.http.post(`${this.domain}forum/addNewForum`, newForum, {headers: {'token': this.getToken()}}) ;  
    }
    
    
    deletePost(postID: number){
      return this.http.delete(`${this.domain}forum/deletePost/${postID}`, { headers: {'token': this.getToken()}})
    }
    
    
    private getToken(){
      return this.authSRV.currentUser['token'] ;
    }
    
    
    // using when you get the forums or answers from server - append the domain to the user image path.
    private addDomainToImagePath(arr){
      for(let i of arr){
        i['user']['profileImagePath'] = this.domain + i['user']['profileImagePath'] ;
      }
      return arr
    }
    
    
    addLike(postId: number) {
      this.http.post(`${this.domain}forum/addLike`,{postId},{headers: {'token': this.getToken()}}).subscribe(
        r => console.log(r),
        err => console.log("error", err.error)
        ) ; 
      }
      

    }