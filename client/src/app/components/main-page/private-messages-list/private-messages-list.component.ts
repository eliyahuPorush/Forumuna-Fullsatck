import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PrivateMessage } from 'src/app/models/privateMessage.model';
import { AuthService } from 'src/app/services/auth.service';
import { PrivateMessageService } from 'src/app/services/privateMessages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-private-messages-list',
  templateUrl: './private-messages-list.component.html',
  styleUrls: ['./private-messages-list.component.css']
})
export class PrivateMessagesListComponent implements OnInit {
  messages: PrivateMessage[] ;
  domain: string = environment.domain ;
  messageClicked: boolean = false ;
  messageTo: string ;
  privateMessageForm: FormGroup ;
  messageClickedSenderId: number ;
  successMessage: string;
  displaySpinner: boolean = false ;
  
  constructor(
    private privateMSGSRV: PrivateMessageService,
    private authSRV: AuthService
  ) { }

  ngOnInit(): void {
    this.privateMSGSRV.getAllMessages(this.authSRV.currentUser.id).subscribe(messages => {
      this.messages = messages ;
      console.log(messages);
      
    })

    this.privateMSGSRV.setMessageReaded(this.authSRV.currentUser.id) ;

    this.privateMessageForm = new FormGroup({
      content: new FormControl(null, Validators.required)
    })

  } 

  onMsgClicked(sender){
    this.successMessage = null ;
    this.privateMessageForm.reset() ;
    this.messageClicked= true ;
    this.messageTo = sender.name ;
    this.messageClickedSenderId = sender.id ;
  }

  onSendMessage(){
    if(this.privateMessageForm.valid){
      this.displaySpinner = true ; 
      setTimeout(() => {
        this.privateMSGSRV.addPrivateMessage(
          this.messageClickedSenderId, 
          this.authSRV.currentUser.id, 
          this.privateMessageForm.controls.content.value
          )
          this.successMessage = "Message send..." ;
          this.messageClicked = false ;
          this.displaySpinner = false ;
      }, 2000)
    }
  }

}
