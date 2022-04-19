import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe:Recipe;  
  id : number;
  constructor(private shoppingListService :ShoppingListService,private recipeService :RecipeService,private route:ActivatedRoute ,private router :Router) {
    
   }

  ngOnInit(): void {
    this.route.params.subscribe((params:Params)=>{
      this.id=+params["id"];
      this.recipe=this.recipeService.getRecipe(this.id);
    })
  }
  addToShoppingList(){
    for (var i =0 ; i< this.recipe.ingredients.length; i++){
      this.shoppingListService.addNewIngredient(this.recipe.ingredients[i]);
    }
    
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe (this.id) ;
    this.router.navigate(['recipes']);
    //route
  }

}
