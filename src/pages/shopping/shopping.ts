import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {

  onAddItem(form: NgForm){
    console.log(form);
  }
}
