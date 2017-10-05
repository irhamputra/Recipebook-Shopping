import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingridient";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth";
import 'rxjs/Rx'

@Injectable()
export class RecipeServices {
  private recipe: Recipe[] = [];

  constructor(private http: Http, private authService: AuthService){}

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

  storeList(token: string){
    const userId = this.authService.getActiveUser().uid;
    return this.http.put('https://ionic-recipebook-51ccd.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipe)
      .map((response: Response) => {
        const recipe: Recipe[] = response.json() ? response.json() : [];
        for (let item of recipe){
          if (!item.hasOwnProperty('ingredients')){
            item.ingredients = [];
          }
        }
        return recipe;
      })
  }

  fetchList(token: string){
    const userId = this.authService.getActiveUser().uid;
    return this.http.get('https://ionic-recipebook-51ccd.firebaseio.com/' + userId + '/recipes.json?auth=' + token, this.recipe)
      .map((response: Response) => {
        return response.json();
      })
      .do((recipes: Recipe[]) => {
        if (recipes){
          this.recipe = recipes
        } else {
          this.recipe = [];
        }
      })
  }
}
