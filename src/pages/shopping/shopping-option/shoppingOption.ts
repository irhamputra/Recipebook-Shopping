import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";
@Component({
  selector: 'page-shoppingOption',
  template: `<ion-grid text-center>
                <ion-row>
                  <ion-col>
                    <h4>Store & load</h4>
                  </ion-col>
              </ion-row>
              <ion-row>
                <ion-col>
                  <button ion-button clear (click)="onActionEvent('load')">
                  Load List
                  </button>
                </ion-col>
               </ion-row>
               <ion-row>
                <ion-col>
                  <button ion-button clear (click)="onActionEvent('store')">
                  Save List
                  </button>
                </ion-col>
              </ion-row>
            </ion-grid>`
})

export class ShoppingOptionPage {
  constructor(private viewCtrl: ViewController){};

  onActionEvent(action: string){
    this.viewCtrl.dismiss({action: action});
  }
}
