import {Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'page-edit-recipes',
  templateUrl: 'edit-recipes.html',
})
export class EditRecipesPage implements OnInit{

  // Reactive Form
  mode = "New";
  selectOptions = ["Easy", "Medium", "Hard"];
  recipeForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit(){
    this.mode = this.navParams.get('mode');
  }

  private initForm(){
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description' : new FormControl(null, Validators.required),
      'difficulty': new FormControl('Medium', Validators.required),

    })
  }
}
