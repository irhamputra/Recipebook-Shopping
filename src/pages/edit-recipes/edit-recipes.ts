import {Component, OnInit} from "@angular/core";
import {NavParams, ActionSheetController, AlertController, ToastController, NavController} from "ionic-angular";
import {FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {RecipeServices} from "../../services/recipe";

@Component({
  selector: 'page-edit-recipes',
  templateUrl: 'edit-recipes.html',
})
export class EditRecipesPage implements OnInit {

  // Reactive Form
  mode = "New";
  selectOptions = ["Easy", "Medium", "Hard"];
  recipeForm: FormGroup;

  constructor(private navParams: NavParams,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private recipeService: RecipeServices,
              private navCtrl: NavController) {
  }

  onSubmit() {
    // Using Recipe Service
    const value = this.recipeForm.value;
    let ingredients = [];
    if (value.ingredients.length > 0){
      ingredients = value.ingredients.map( name => {
        return { name: name, amount: 1 }
      })
    }
    this.recipeService.addRecipe(value.title, value.description, value.difficulty, ingredients);
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  addManageRecipe() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'What you want to do?',
      buttons: [{
        text: 'Add Ingredients',
        handler: () => {
          // Calling alert controller
          this.createIngredientAlert().present()
        }
      },
        {
          text: 'Remove all',
          role: 'destructive',
          handler: () => {
            // Removing All Data
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
            const leng = fArray.length;
            if ( leng > 0 ){
              for (let i = leng -1; i >= 0; i--){
                fArray.removeAt(i)
              }
              const toast = this.toastCtrl.create({
                message: 'All ingredients were deleted',
                duration: 1590,
                position: 'top'
              });
              toast.present();
            }
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
              const toast = this.toastCtrl.create({
                message: 'Please enter the ingredient',
                duration: 1590,
                position: 'top'
              });
              toast.present();
              return;
            }
            // TODO: Toast message if success
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
            const toast = this.toastCtrl.create({
              message: 'You have added the ingredient',
              duration: 1590,
              position: 'top'
            });
            toast.present();
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
