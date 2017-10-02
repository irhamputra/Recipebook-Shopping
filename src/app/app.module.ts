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

@NgModule({
  declarations: [
    MyApp,
    EditRecipesPage,
    TabsPage,
    RecipesPage,
    RecipePage,
    ShoppingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    EditRecipesPage,
    TabsPage,
    RecipesPage,
    RecipePage,
    ShoppingPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShoppingService
  ]
})
export class AppModule {}
