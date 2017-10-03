import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditRecipesPage } from "../edit-recipes/edit-recipes";
import {Recipe} from "../../models/recipe";
import {RecipeServices} from "../../services/recipe";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {
  private recipes: Recipe[] = [];

  constructor(public navCtrl: NavController,
              public recipeService: RecipeServices) {
  }

  ionViewWillEnter(){
    this.recipes = this.recipeService.getRecipe()
  }

  toAddRecipe(){
    this.navCtrl.push(EditRecipesPage, { mode: 'New' })
  }

  onLoadRecipe(){

  }
}
