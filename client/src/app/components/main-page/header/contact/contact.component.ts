import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm:FormGroup ;
  spinner:boolean = false ;
  message:string ;
  warningMessage:string ;
  constructor() { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null),
      phone: new FormControl(null),
      content: new FormControl(null)
    })
  }
  onSubmit(){
      if(this.contactForm.controls.name.value != null){
        this.spinner = true;
        setTimeout(()=>{
          this.spinner = false;
          this.warningMessage = null ;
          this.message = `${this.contactForm.controls.name.value} Your message has been sent... we'll be in touch` ;
        }, 1000)
      }
      else {
        this.warningMessage = "Please enter your name first" ;
      }
  }

}
