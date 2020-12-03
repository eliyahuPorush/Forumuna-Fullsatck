import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUPComponent implements OnInit {
  brand = environment.brand ;
  createAccountForm: FormGroup ;
  errorMessage ;
  spinner : boolean = false ;
  formData ;
  imageUrl: string | ArrayBuffer ;
  selectedFile: File ;


  constructor(
    private authSRV: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createAccountForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      passwordConfirm: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      image: new FormControl(null),
    })
  }


  // this.authSRV.uploadImageProfile(this.selectedFile.file, this.createAccountForm.controls.email.value)

  onSubmit(){
    if( // check if form is valid and password equal to passwordConfirm
      this.createAccountForm.valid && 
      this.createAccountForm.controls.password.value == this.createAccountForm.controls.passwordConfirm.value
    ){
      let form = this.createAccountForm.controls ;
      this.spinner = true ;
      setTimeout(() => {
        this.authSRV.signup(form.name.value, form.email.value, form.password.value, form.passwordConfirm.value, this.formData).subscribe(() => {
          this.authSRV.uploadImageProfile(this.selectedFile, this.createAccountForm.controls.email.value)
          this.router.navigate(['main'])
          })
      }, 500)
    }
    else{
      this.errorMessage = 'One of your details is incorrect!' ;
    }
  
  }
  onLoadImg(e){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = file;
    });
    reader.readAsDataURL(file);
  }

}
