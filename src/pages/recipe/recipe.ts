import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {EditRecipesPage} from "../edit-recipes/edit-recipes";
import {ShoppingService} from "../../services/shopping";
import {RecipeServices} from "../../services/recipe";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{
  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public shoppingService: ShoppingService,
              public recipeService: RecipeServices) {
  }

  ngOnInit(){
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe(){
    this.navCtrl.push(EditRecipesPage, { 'mode': 'Edit', recipe: this.recipe, index: this.index})
  }

  onDeleteRecipe(){
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

  addToShopping(){
    this.shoppingService.addMultipleItem(this.recipe.ingredients)
  }
}
