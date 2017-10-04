import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService){}

  signInUser(form: NgForm){
    let formEmail = form.value.email;
    let formPassword = form.value.password;
    this.authService.signIn(formEmail, formPassword)
      .then(data => { console.log(data) })
      .catch(error => { console.log(error) });
  }
}
