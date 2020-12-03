import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { PrivateMessageService } from 'src/app/services/privateMessages.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-other-user-details',
  templateUrl: './other-user-details.component.html',
  styleUrls: ['./other-user-details.component.css']
})
export class OtherUserDetailsComponent implements OnInit {
  otherUserDetails: User;
  domain: string = environment.domain ;
  imagePath: string ;
  privateMessageForm: FormGroup ;
  displaySendMessageArea: boolean = false ;
  successMessage: string ;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authSRV: AuthService,
    private postSRV: PostService,
    private privateMSGSRV: PrivateMessageService
  ) { }

  ngOnInit(): void {
    this.authSRV.getOtherUserDetails(this.activatedRoute.snapshot.params['userID']).subscribe(user => {
      this.otherUserDetails = user ;
      this.imagePath = this.domain + this.otherUserDetails.profileImagePath ;
    }) ;

    this.privateMessageForm = new FormGroup({
      messageContent: new FormControl(null, Validators.required)
    })
  }


  sendPrivateMeassegeClicked(){
    this.displaySendMessageArea = true ;
  }

  onSubmit(){
    if(this.privateMessageForm.valid){
      this.privateMSGSRV.addPrivateMessage(this.otherUserDetails.id,this.authSRV.currentUser.id, this.privateMessageForm.controls.messageContent.value) ;
      this.privateMessageForm.reset() ;
      this.displaySendMessageArea = false ;
      this.successMessage = "Your message has been sent." ;
    }
  }
}
