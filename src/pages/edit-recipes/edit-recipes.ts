import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import {
  NavParams,
  ActionSheetController,
  AlertController,
  ToastController, NavController
} from "ionic-angular";

import { Recipe } from "../../models/recipe";
import {RecipeServices} from "../../services/recipe";

@Component({
  selector: 'page-edit-recipes',
  templateUrl: 'edit-recipes.html',
})
export class EditRecipesPage implements OnInit {

  // Reactive Form
  mode = "New";
  selectOptions = ["Easy", "Medium", "Hard"];
  recipeForm: FormGroup;
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipeService: RecipeServices,
              private navCtrl: NavController) {
  }

  onSubmit() {
    // Using Recipe Service
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0){
      ingredients = value.ingredients.map( name => {
        return { name: name, amount: 1 }
      })
    }
    // Update Recipe
    if (this.mode == 'Edit'){
      this.recipeService.updateRecipe(this.index, value.title, value.description, value.difficulty, ingredients)
    } else {
      this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  addManageRecipe() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Manage ingredients',
      buttons: [{
        text: 'Add Ingredients',
        handler: () => {
          // Calling alert controller
          this.createIngredientAlert().present()
        }
      },
        {
          text: 'Remove all',
          role: 'destructive',
          handler: () => {
            // Removing All Data
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const leng = fArray.length;
            if ( leng > 0 ){
              for (let i = leng -1; i >= 0; i--){
                fArray.removeAt(i)
              }
              const toast = this.toastCtrl.create({
                message: 'All ingredients were deleted',
                duration: 1590,
                position: 'top'
              });
              toast.present();
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }]
    });
    actionSheet.present();
  }

  private createIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add ingredient',
      inputs: [{
          name: 'name',
          placeholder: 'Name'
        }],
      buttons: [{
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null){
              const toast = this.toastCtrl.create({
                message: 'Please enter the ingredient',
                duration: 1590,
                position: 'top'
              });
              toast.present();
              return;
            }
            // TODO: Toast message if success
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'You have added the ingredient',
              duration: 1590,
              position: 'top'
            });
            toast.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }]
    })
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if ( this.mode == 'Edit'){
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initForm()
  }

  private initForm() {
    // Default value
    let title = null;
    let description  = null;
    let difficulty = 'Easy';
    let ingredients = [];

    if (this.mode == 'Edit'){
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for (let ingredient of this.recipe.ingredients){
        ingredients.push(new FormControl(ingredient.name, Validators.required))
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    })
  }
}
