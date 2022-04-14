
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new Subject <Ingredient[]>() ;
    startedEditing  = new Subject<number > (); 
    ingredients :Ingredient[]= [ 
        new Ingredient("Apples",5), 
        new Ingredient("Tomatoes",6), 
        
      ];
     addNewIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice()); 
    } 
      getIngredients(){
          return this.ingredients.slice();
          
      }
      getIngredient(index: number ):Ingredient {
        return this.ingredients[index];
      } 
      updateIngredient (index : number , newIngredient : Ingredient){
          this.ingredients[index] = newIngredient ;
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      deleteIngredient ( index :number ) {
          this.ingredients.splice(index,1);
          
          this.ingredientsChanged.next(this.ingredients.slice());
      }
      
}