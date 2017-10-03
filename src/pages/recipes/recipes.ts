import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EditRecipesPage } from "../edit-recipes/edit-recipes";
import {Recipe} from "../../models/recipe";
import {RecipeServices} from "../../services/recipe";
import {RecipePage} from "../recipe/recipe";

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

  onLoadRecipe(recipe: Recipe, index: number){
    this.navCtrl.push(RecipePage, {recipe: recipe, index: index})
  }
}
