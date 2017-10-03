import {Component, OnInit} from "@angular/core";
import {NavController, NavParams, ActionSheetController} from "ionic-angular";
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'page-edit-recipes',
  templateUrl: 'edit-recipes.html',
})
export class EditRecipesPage implements OnInit {

  // Reactive Form
  mode = "New";
  selectOptions = ["Easy", "Medium", "Hard"];
  recipeForm: FormGroup;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public actionSheetCtrl: ActionSheetController) {
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  addManageRecipe() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Add Ingredients',
      buttons: [{
        text: 'Add Ingredients',
        handler: () => {

        }
      },
        {
          text: 'Remove all',
          role: 'destructive',
          handler: () => {

          }
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

    })
  }
}
