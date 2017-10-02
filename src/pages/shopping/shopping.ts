import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ShoppingService} from "../../services/shopping";
import {Ingredient} from "../../models/ingridient";

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {
  listIngredient: Ingredient[];

  constructor(private shoppingServices: ShoppingService){}

  ionViewWillEnter(){
    this.loadItem();
  }

  onAddItem(form: NgForm){
    this.shoppingServices.addItem(form.value.ingredientName, form.value.amount);
    this.loadItem();
    form.reset();
  }

  private loadItem(){
    this.listIngredient = this.shoppingServices.getItem();
  }
}
