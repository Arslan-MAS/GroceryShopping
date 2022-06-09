
import { Recipe } from "../recipe.model";
import * as RecipeActions  from "./recipe.actions";


export interface State {
    recipes : Recipe[];

}
const initstate : State = {
    recipes: [ ]
}
export function recipeReducer (state:State = initstate , action :RecipeActions.RecipeActionsTypes){ 
    var newAction ;
    switch (action.type ){
        case RecipeActions.SET_RECIPES:
            newAction= <RecipeActions.SetRecipes>action;
            return {
                ...state ,
                recipes :[...newAction.payload ],
            }
        case RecipeActions.ADD_RECIPE :
            newAction = <RecipeActions.AddRecipe>action;
            return {
                ...state ,
                recipes:[...state.recipes,newAction.payload]
            }
        case RecipeActions.DELETE_RECIPE:
            newAction= < RecipeActions.DeleteRecipe>action ;
            return {
                ...state , 
                recipes :[...state.recipes.filter((recipe,index)=>{
                    return index!==newAction.payload;
                })]
            }
        case RecipeActions.UPDATE_RECIPE :
            newAction = <RecipeActions.UpdateRecipe> action; 
            const updatedRecipe ={
                ...state.recipes[newAction.payload.index],
                ...newAction.payload.newRecipe,
            }
            const updatedRecipes = [...state.recipes];
            updatedRecipes[newAction.payload.index] = updatedRecipe ;

            return {...state,
                recipes : updatedRecipes,
            }
            
        default :
            return state ;


    }

}