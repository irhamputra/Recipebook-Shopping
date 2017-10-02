import { Ingredient } from "../models/ingridient";

export class ShoppingService {
  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number){
    this.ingredients.push(new Ingredient(name, amount));
    // console.log(this.ingredients);
  }

  addMultipleItem(items: Ingredient[]){
    this.ingredients.push(...items)
  }

  getItem(){
    return this.ingredients.slice();
  }

  removeItem(index: number){
    return this.ingredients.splice(index, 1);
  }
}
