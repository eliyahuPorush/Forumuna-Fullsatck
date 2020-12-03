import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PrivateMessage } from '../models/privateMessage.model';

@Injectable({
    providedIn: 'root'
  })
  export class PrivateMessageService {
    domain : string = environment.domain ;
    messages: BehaviorSubject<PrivateMessage[]> = new BehaviorSubject<PrivateMessage[]>(null);
    unreadMessages: BehaviorSubject<PrivateMessage[]> = new BehaviorSubject<PrivateMessage[]>(null);
    unreadMessagesNumber: BehaviorSubject<number> = new BehaviorSubject<number>(null);

    constructor(
        private http: HttpClient,
        ){}

    addPrivateMessage(idUserReceiver: number, idUserSender: number, messageContent: string) {
        this.http.post(`${this.domain}private-message/add`, {
          senderId: idUserSender,
          receiverId: idUserReceiver, 
          messageContent: messageContent
        }).subscribe()
      }

    getUnreadedMessages(userId: number){
          this.http.get<PrivateMessage[]>(`${this.domain}private-message/getMessagesUnread/${userId}`).subscribe(messages => {
              this.unreadMessages.next(messages) ;
              this.unreadMessagesNumber.next(messages.length) ;
          })

      }

      getAllMessages(userId: number){
        return this.http.get<PrivateMessage[]>(`${this.domain}private-message/getAllMessages/${userId}`)

    }

    setMessageReaded(userId: number){
      return this.http.put(`${this.domain}private-message/setAllMessageReaded/${userId}`, {}).subscribe()
    }

  }