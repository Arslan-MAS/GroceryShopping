
import { Recipe } from "../recipe.model";
import * as RecipeActions  from "./recipe.actions";


export interface State {
    recipes : Recipe[];

}
const initstate : State = {
    recipes: [ ]
}
export function recipeReducer (state = initstate , action :RecipeActions.RecipeActions){ 

    switch (action.type ){
        case RecipeActions.SET_RECIPES:
            return {
                ...state ,
                recipes :[...action.payload ],
            }
        default :
            return state ;


    }

}