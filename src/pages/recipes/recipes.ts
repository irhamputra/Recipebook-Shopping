import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditRecipesPage } from "../edit-recipes/edit-recipes";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  toAddRecipe(){
    this.navCtrl.push(EditRecipesPage, { mode: 'New' })
  }

}
