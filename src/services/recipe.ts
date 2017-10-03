import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingridient";

export class RecipeServices {
  private recipe: Recipe[] = [];

  addRecipe(title: string,
            description: string,
            difficulty: string,
            ingredients: Ingredient[])
  {
    this.recipe.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipe)
  }

  removeRecipe(index: number){
    this.recipe.splice(index, 1)
  }

  updateRecipe(index: number,
               title: string,
               description: string,
               difficulty: string,
               ingredients: Ingredient[])
  {
    this.recipe[index] = new Recipe(title, description, difficulty, ingredients);
  }

  getRecipe(){
   return this.recipe.slice();
  }
}
