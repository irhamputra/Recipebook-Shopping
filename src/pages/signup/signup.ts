import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService: AuthService){}

  signUpUser(form: NgForm){
    let formEmail = form.value.email;
    let formPassword = form.value.password;
    this.authService.signUp(formEmail, formPassword)
      .then(data => { console.log(data)})
      .catch(error => { console.log(error)});
  }
}
