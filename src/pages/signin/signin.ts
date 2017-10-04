import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {
  signInUser(form: NgForm){
    console.log(form.value);
  }
}
