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
    
    
}
export type RecipeActions = SetRecipes; 