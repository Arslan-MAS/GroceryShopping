import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect ,ofType} from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { map, switchMap, tap ,withLatestFrom} from "rxjs/operators";
import * as fromApp from "src/app/store/app.reducer";
import { Recipe } from "../recipe.model";
import  * as RecipesActions from "./recipe.actions";
@Injectable()
export class RecipeEffects {
    @Effect()
    fetchRecipes= this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES),switchMap(()=>{
        return this.http.get <Recipe[]>("https://angularcourseproject-2e57e-default-rtdb.firebaseio.com/recipes.json")
    }),
    map(response=>{
        return response.map(recipe=>{
            return {...recipe,ingredients:recipe.ingredients? recipe.ingredients:[]}
            })
        }
    ),
    map (recipes => {
        return new RecipesActions.SetRecipes(recipes);
    })
    )
    
    storeRecipes = createEffect(
        ()=> {
            return this.actions$.pipe(ofType((RecipesActions.STORE_RECIPES))
            ,withLatestFrom(
                this.store.select("recipes")
            ),
            switchMap(([actionData, recipesState])=>{
                return this.http.put("https://angularcourseproject-2e57e-default-rtdb.firebaseio.com/recipes.json",recipesState.recipes);
            })
          
        )


    },
    {dispatch:false});
    constructor (private actions$:Actions,private http :HttpClient,private store :Store<fromApp.AppState>){

    }
}