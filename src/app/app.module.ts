import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {EditRecipesPage} from "../pages/edit-recipes/edit-recipes";
import {TabsPage} from "../pages/tabs/tabs";
import {RecipesPage} from "../pages/recipes/recipes";
import {RecipePage} from "../pages/recipe/recipe";
import {ShoppingPage} from "../pages/shopping/shopping";
import {ShoppingService} from "../services/shopping";
import {ShoppingformPage} from "../pages/shoppingform/shoppingform";
import {RecipeServices} from "../services/recipe";
import {SignupPage} from "../pages/signup/signup";
import {SigninPage} from "../pages/signin/signin";
import {AuthService} from "../services/auth";
import {ShoppingOptionPage} from "../pages/shopping/shopping-option/shoppingOption";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    MyApp,
    EditRecipesPage,
    TabsPage,
    RecipesPage,
    RecipePage,
    ShoppingPage,
    ShoppingformPage,
    SignupPage,
    SigninPage,
    ShoppingOptionPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipesPage,
    TabsPage,
    RecipesPage,
    RecipePage,
    ShoppingPage,
    ShoppingformPage,
    SignupPage,
    SigninPage,
    ShoppingOptionPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingService,
    RecipeServices,
    AuthService
  ]
})
export class AppModule {}
