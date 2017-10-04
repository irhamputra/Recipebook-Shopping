import {Component} from '@angular/core';
import {NavController, ViewController, PopoverController, LoadingController, AlertController} from 'ionic-angular';
import { EditRecipesPage } from "../edit-recipes/edit-recipes";
import {Recipe} from "../../models/recipe";
import {RecipeServices} from "../../services/recipe";
import {RecipePage} from "../recipe/recipe";
import {DatabaseOptionPage} from "../database/database-option";
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  private recipes: Recipe[] = [];

  constructor(private navCtrl: NavController,
              private recipeService: RecipeServices,
              private viewCtrl: ViewController,
              private popoverCtrl: PopoverController,
              private loaderCtrl: LoadingController,
              private authService: AuthService,
              private alertCtrl: AlertController) {
  }

  ionViewWillEnter(){
    this.recipes = this.recipeService.getRecipe();
    this.viewCtrl.setBackButtonText('List');
    this.viewCtrl.showBackButton(false);
  }

  toAddRecipe(){
    this.navCtrl.push(EditRecipesPage, { mode: 'New' })
  }

  onLoadRecipe(recipe: Recipe, index: number){
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index})
  }

  onShowOption(event: MouseEvent) {
    const loader = this.loaderCtrl.create({
      spinner: 'dots',
      content: 'Please wait...',
      duration: 1500
    });
    const popover = this.popoverCtrl.create(DatabaseOptionPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        switch (data.action) {
          case 'load':
            loader.present();
            this.authService.getActiveUser().getIdToken()
              .then((token: string) => {
                this.recipeService.fetchList(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      loader.dismiss();
                      if (list) {
                        this.recipes = list;
                      } else {
                        this.recipes = [];
                      }
                    },
                    error => {
                      loader.dismiss();
                      this.errorHandling(error.json().error)
                    }
                  );
              });
            break;

          case 'store':
            loader.present();
            this.authService.getActiveUser().getIdToken()
              .then((token: string) => {
                this.recipeService.storeList(token)
                  .subscribe(
                    () => {
                      loader.dismiss();
                      console.log('Success')
                    },
                    error => {
                      loader.dismiss();
                      this.errorHandling(error.message);
                    }
                  );
              });
            break;
        }
      })
  }

  private errorHandling(errorMessage: string){
    const alert = this.alertCtrl.create({
      title: 'Error',
      message: errorMessage,
      buttons: ['OK']
    });
    alert.present();
  }
}
