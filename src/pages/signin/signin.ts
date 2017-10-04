import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth";
import {LoadingController, AlertController} from "ionic-angular";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService,
              private loaderCtrl: LoadingController,
              private alertCtrl: AlertController){}

  signInUser(form: NgForm){
    // loading component
    const loading = this.loaderCtrl.create({
      spinner: 'dots',
      content: 'Please wait..',
      duration: 1500
    });
    let formEmail = form.value.email;
    let formPassword = form.value.password;
    this.authService.signIn(formEmail, formPassword)
      .then(data => {
        loading.present();
        console.log(data)
      })
      .catch(error => {
        // alert component
        const alert = this.alertCtrl.create({
          title: 'Sign in failed',
          message: 'Your email and password did not match',
          buttons: ['Try again']
        });
        alert.present();
        console.log(error)
      });
  }
}
