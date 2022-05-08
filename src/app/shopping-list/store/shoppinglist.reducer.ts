import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import * as ShoppinListActions from "./shoppinglist.actions";
import { ShoppingListActions } from "./shoppinglist.actions";

export interface State {
    ingredients :Ingredient[];
    editedIngredient : Ingredient ;
    editedIngredientIndex :number ;

}

const initialState :State = {
    ingredients : [ 
        new Ingredient("Apples",5), 
        new Ingredient("Tomatoes",6), 
      ],

    editedIngredient : null  ,
    editedIngredientIndex : -1 ,
    

}
export function shoppingListReducer(state:State= initialState ,action :ShoppingListActions  ){
    switch (action.type){
        case  ShoppinListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:[...state.ingredients,action.payload]
            }
            break ;

        case ShoppinListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients:[...state.ingredients,...action.payload]
            };

        case ShoppinListActions.UPDATE_INGREDIENT:
            //immutable updating i.e copy first 
                const ingredient = state.editedIngredient;
                const updatedIngredient = {
                    ...ingredient,
                    ...action.payload.payload
                };
                const updatedIngredients = [...state.ingredients];
                updatedIngredients[state.editedIngredientIndex]= updatedIngredient;
                return {
                    ...state,
                    ingredients:updatedIngredients,
                    editedIngredient : null,
                    editedIngredientIndex :-1 , 
                };
                
        case ShoppinListActions.DELETE_INGREDIENT:
                
                return {
                    ...state, 
                    ingredients : state.ingredients.filter( (ig,igNumber)=> {
                        return igNumber !==  state.editedIngredientIndex ;
                    }),
                    editedIngredient : null,
                    editedIngredientIndex :-1 ,
                };
        case ShoppinListActions.START_EDIT:
            return {
                ...state ,
                editedIngredient : {...state.ingredients[action.payload]},
                editedIngredientIndex : action.payload ,
            }
        case ShoppinListActions.CANCEL_EDIT :
            return {
                ...state,
                editedIngredient : null,
                editedIngredientIndex :-1 ,
            }
        default :
            return state; 
    }
}