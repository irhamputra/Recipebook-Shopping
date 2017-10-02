import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ShoppingService} from "../../services/shopping";
import {Ingredient} from "../../models/ingridient";
import {AlertController, NavController} from "ionic-angular";
import {ShoppingformPage} from "../shoppingform/shoppingform";

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {
  listIngredient: Ingredient[];

  constructor(private shoppingServices: ShoppingService,
              public alertCtrl: AlertController,
              public navCtrl: NavController) {
  }

  onToFormPage(){
    this.navCtrl.push(ShoppingformPage);
  }

  ionViewWillEnter() {
    this.loadItem();
  }

  onAddItem(form: NgForm) {
    this.shoppingServices.addItem(form.value.ingredientName, form.value.amount);
    this.loadItem();
    form.reset();
  }

  private loadItem() {
    this.listIngredient = this.shoppingServices.getItem();
  }

  onRemoveItem(index: number) {
    const alert = this.alertCtrl.create({
      title: 'Delete a list',
      message: 'Are you sure do you want to remove this item?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.shoppingServices.removeItem(index);
          this.loadItem();
        }
      },
        {
          text: 'no',
          role: 'cancel',
          handler: () => {
            console.log('Cancel delete task');
          }
        }]
    });

    alert.present();
  }
}
