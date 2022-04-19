import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : number ;
  editMode = false ;
  recipeForm:FormGroup;
  constructor(private router: Router, private route :ActivatedRoute,private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.editMode= params["id"] != null; 
      this.id = +params['id']; 
      this.initForm();
    })
  }
  onSubmit(){
    console.log(this.recipeForm);
    // const name = this.recipeForm.get("name").value;
    //   const description = this.recipeForm.get("description").value;
    //   const imagePath = this.recipeForm.get("imagePath").value;
    //   var  ingredients : Ingredient[];
      
      //var recipe = new Recipe(name,description,imagePath,ingredients);
    if (this.editMode === true ){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }
  private initForm(){
    let recipeName = '';
    let recipeUrl = '';
    let recipeDescp = '';
    let recipeIngredients : FormArray = new FormArray([]) ;
    if (this.editMode ){

      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescp =recipe.description;
      recipeUrl= recipe.imagePath;
      if (recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(new FormGroup({
            'name': new FormControl (ingredient.name, Validators.required),
            'amount': new FormControl (ingredient.amount,[ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),

          }))
        }
      }
    }else {

    }
    
    this.recipeForm= new FormGroup({
      'name' : new FormControl(recipeName , Validators.required),
      'description' : new FormControl(recipeDescp, Validators.required),
      'imagePath' : new FormControl (recipeUrl, Validators.required),
      'ingredients' : recipeIngredients

    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onCancel(){
    this.router.navigate(['../'],{relativeTo:this.route})
  }
  onAddIngredient(){
    (<FormArray>this.recipeForm.get("ingredients")).push(new FormGroup({
      'name':new FormControl(null ,Validators.required ),
      'amount' : new FormControl(null,[ Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)] ) 
    }))
  }
  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }
}
