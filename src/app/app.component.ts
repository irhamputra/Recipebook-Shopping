import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import {TabsPage} from "../pages/tabs/tabs";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  tabsPage = TabsPage;
  signinPage = SigninPage;
  signupPage = SignupPage;
  isAuth = false;

  @ViewChild('nav') navCtrl: NavController;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private menuCtrl: MenuController) {
    platform.ready().then(() => {
      firebase.initializeApp({
        apiKey: "AIzaSyCyqvts3BN2bVISYJu_5y4FiLsHh86PYWc",
        authDomain: "ionic-recipebook-51ccd.firebaseapp.com",
      });

      // manage user state
      firebase.auth().onAuthStateChanged( user => {
        if (user) {
          this.isAuth = true;
          this.navCtrl.setRoot(this.tabsPage)
        } else {
          this.isAuth = false;
          this.navCtrl.setRoot(this.signinPage);
        }
      });

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any){
    this.navCtrl.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout(){

  }
}

