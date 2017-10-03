import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, ActionSheetController, AlertController} from "ionic-angular";
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";

@Component({
  selector: 'page-edit-recipes',
  templateUrl: 'edit-recipes.html',
})
export class EditRecipesPage implements OnInit {

  // Reactive Form
  mode = "New";
  selectOptions = ["Easy", "Medium", "Hard"];
  recipeForm: FormGroup;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController) {
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  addManageRecipe() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What you want to do?',
      buttons: [{
        text: 'Add Ingredients',
        handler: () => {
          this.createIngredientAlert().present()
        }
      },
        {
          text: 'Remove all',
          role: 'destructive',
          handler: () => {

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }]
    });
    actionSheet.present();
  }

  private createIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add ingredient',
      inputs: [{
          name: 'name',
          placeholder: 'Name'
        }],
      buttons: [{
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null){
              return;
            }
            // TODO: Error message
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required))
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }]
    })
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm()
  }

  private initForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl('Easy', Validators.required),
      'ingredients': new FormArray([])
    })
  }
}
