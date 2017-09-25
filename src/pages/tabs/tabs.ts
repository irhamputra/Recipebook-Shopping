import { Component } from '@angular/core';
import {ShoppingPage} from "../shopping/shopping";
import {RecipesPage} from "../recipes/recipes";

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  shopping = ShoppingPage;
  recipes = RecipesPage;
}
