import { Component, Input, OnInit } from '@angular/core';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input("recipeComponent") recipe:Recipe;  
  constructor(private shoppingListService :ShoppingListService) { }

  ngOnInit(): void {
  }
  addToShoppingList(){
    for (var i =0 ; i< this.recipe.ingredients.length; i++){
      this.shoppingListService.addNewIngredient(this.recipe.ingredients[i]);
    }
    
  }

}
