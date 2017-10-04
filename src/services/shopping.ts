import { Ingredient } from "../models/ingridient";
import { Injectable } from '@angular/core';
import {Http, Response} from "@angular/http";
import {AuthService} from "./auth";
import 'rxjs/Rx'

@Injectable()
export class ShoppingService {
  private ingredients: Ingredient[] = [];

  constructor(private http: Http, private authService: AuthService){}

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

  storeList(token: string){
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://ionic-recipebook-51ccd.firebaseio.com/' + userId + '/shopping-list.json', this.ingredients)
      .map((respons: Response) => {
        return respons.json();
      });
  }
}
