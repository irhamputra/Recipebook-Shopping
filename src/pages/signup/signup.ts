import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";
import {LoadingController, AlertController} from "ionic-angular";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService: AuthService,
              private loaderCtrl: LoadingController,
              private alertCtrl: AlertController ){}

  signUpUser(form: NgForm){
    // loading component
    const loading = this.loaderCtrl.create({
      content: 'Please wait..',
      spinner: 'dots',
      duration: 1500,
    });
    // form value default
    let formEmail = form.value.email;
    let formPassword = form.value.password;
    this.authService.signUp(formEmail, formPassword)
      .then(data => { loading.present(); console.log(data)})
      .catch(error => {
        loading.dismiss();
        // alert component
        const alert = this.alertCtrl.create({
          title: 'Sign Up failed',
          message: error.message,
          buttons: ['OK']
        });
        alert.present();
      });
  }
}
