import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const ADD_RECIPE = "[recipe] ADD_RECIPE";
export const DELETE_RECIPE = "[recipe] DELETE_RECIPE";
export const ADD_RECIPES = "[recipe] ADD_RECIPES";
export const UPDATE_RECIPE = "[recipe] UPDATE_RECIPE";
export const FETCH_RECIPES = "[recipe] FETCH_RECIPE";
export const STORE_RECIPES = "[recipe] STORE_RECIPE";
export const SET_RECIPES = "[recipe] SET_RECIPE";






export class SetRecipes implements Action {

    readonly type: string = SET_RECIPES ; 
    constructor (public payload :Recipe[]){

    }
    
}

export class FetchRecipes implements Action {

    readonly type: string = FETCH_RECIPES ; 
    constructor (){
        
    }
    
    
}
export class UpdateRecipe implements Action {
   readonly type :string = UPDATE_RECIPE ;
    constructor (public payload :{ index :number , newRecipe:Recipe }){

    }
}
export class AddRecipe implements Action {
     readonly type :string = ADD_RECIPE ;
     constructor (public payload : Recipe ){

     }

}
export class DeleteRecipe implements Action {
    readonly type :string = DELETE_RECIPE  ;
    constructor (public payload :number ){

    }

}
export class StoreRecipes implements Action {
    readonly type :string = STORE_RECIPES ;
    constructor(){

    }
}

export type RecipeActionsTypes = StoreRecipes|SetRecipes | FetchRecipes|DeleteRecipe |AddRecipe |UpdateRecipe ; 