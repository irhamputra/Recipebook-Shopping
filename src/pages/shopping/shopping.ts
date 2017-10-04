import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ShoppingService} from "../../services/shopping";
import {Ingredient} from "../../models/ingridient";
import {AlertController, NavController, PopoverOptions, PopoverController} from "ionic-angular";
import {ShoppingOptionPage} from "./shopping-option/shoppingOption";
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-shopping',
  templateUrl: 'shopping.html',
})
export class ShoppingPage {
  listIngredient: Ingredient[];

  constructor(private shoppingServices: ShoppingService,
              public alertCtrl: AlertController,
              public navCtrl: NavController,
              private popoverCtrl: PopoverController,
              private authService: AuthService) {
  }

  onShowOption(event: MouseEvent){
    const popover = this.popoverCtrl.create(ShoppingOptionPage);
    popover.present({ev: event});
    popover.onDidDismiss(data => {
      if (data.action == 'load'){

      } else {
        this.authService.getActiveUser().getToken()
          .then()
          .catch(error => console.log(error));
      }
    })
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
