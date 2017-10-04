import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {ShoppingService} from "../../services/shopping";
import {Ingredient} from "../../models/ingridient";
import {AlertController, NavController, PopoverController, LoadingController} from "ionic-angular";
import {DatabaseOptionPage} from "../database/database-option";
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
              private authService: AuthService,
              private loaderCtrl: LoadingController,) {
  }

  onShowOption(event: MouseEvent) {
    const loader = this.loaderCtrl.create({
      spinner: 'dots',
      content: 'Please wait...',
      duration: 1500
    });
    const popover = this.popoverCtrl.create(DatabaseOptionPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      data => {
        if (!data) {
          return;
        }
        switch (data.action) {
          case 'load':
            loader.present();
            this.authService.getActiveUser().getIdToken()
              .then((token: string) => {
                this.shoppingServices.fetchList(token)
                  .subscribe(
                    (list: Ingredient[]) => {
                      loader.dismiss();
                      if (list) {
                        this.listIngredient = list;
                      } else {
                        this.listIngredient = [];
                      }
                    },
                    error => {
                      loader.dismiss();
                      this.errorHandling(error.json().error)
                    }
                  );
              });
            break;
          case 'store':
            loader.present();
            this.authService.getActiveUser().getIdToken()
              .then((token: string) => {
                this.shoppingServices.storeList(token)
                  .subscribe(
                    () => {
                      loader.dismiss();
                      console.log('Success')
                    },
                    error => {
                      loader.dismiss();
                      this.errorHandling(error.message);
                    }
                  );
              });
            break;
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

  private errorHandling(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'Error',
      message: errorMessage,
      buttons: ['OK']
    });
    alert.present();
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
        }]
    });

    alert.present();
  }
}
