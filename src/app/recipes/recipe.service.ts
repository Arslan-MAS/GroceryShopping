import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService  {
    recipeTransmitter = new Subject<Recipe[]>();
    // private recipes:Recipe []  =[
    //     new Recipe (
    //         'Tasty Schnitzel' ,
    //      ' A super-tasty Schnitzel- just Awesome!', 
    //     'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/strapatsada_93222_16x9.jpg',
    //     [new Ingredient('Meat',1),
    //     new Ingredient('French Fries',20)
    // ]),
    //     new Recipe (
    //         'Big Fat Burger' , 
    //         ' What else you need to say?', 
    //         'https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/strapatsada_93222_16x9.jpg',
    //         [new Ingredient ("Bunss",2),
    //     new Ingredient ("Meat",1)])
    //    ] ;
    private recipes:Recipe []  =[];
    setRecipes (arrayRecipes : Recipe[]){
        this.recipes=arrayRecipes; 
        this.recipeTransmitter.next(this.recipes.slice());
    }
    getRecipes (){ 
        return this.recipes.slice(); 
    }
    getRecipe (id: number) :Recipe{
        return this.recipes[id];
    } 
    addRecipe ( recipe: Recipe ){
        this.recipes.push(recipe);
        this.recipeTransmitter.next(this.recipes.slice());
    }
    updateRecipe (index : number , updatedRecipe :Recipe){
        this.recipes[index]= updatedRecipe;
        
        this.recipeTransmitter.next(this.recipes.slice());
    }
    addIngredientToRecipe (index : number , ingredient : Ingredient ){

    }
    deleteIngredientFromRecipe (index : number , ingredient :Ingredient ){

    }
    deleteRecipe (index : number){
        this.recipes.splice(index,1);
        this.recipeTransmitter.next(this.recipes.slice());
    }
}