import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>(); 
    private recipes:Recipe []  =[
        new Recipe (
            'Tasty Schnitzel' ,
         ' A super-tasty Schnitzel- just Awesome!', 
        'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/strapatsada_93222_16x9.jpg',
        [new Ingredient('Meat',1),
        new Ingredient('French Fries',20)
    ]),
        new Recipe (
            'Big Fat Burger' , 
            ' What else you need to say?', 
            'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/strapatsada_93222_16x9.jpg',
            [new Ingredient ("Bunss",2),
        new Ingredient ("Meat",1)])
       ] ;
    getRecipes (){ 
        return this.recipes.slice(); 
    }
    getRecipe (id: number) :Recipe{
        return this.recipes[id];
    } 
}