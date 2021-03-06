import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { from } from "rxjs";
//import { take } from "rxjs-compat/operator/take";
import { map, tap,take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import * as fromRecipes from "../recipes/store/recipe.actions";
import { AppState } from "../store/app.reducer";


@Injectable({
    providedIn:'root'
})
export class DataStorageService {

    constructor(private authService :AuthService, private http  :HttpClient  , private store :Store <AppState>){

    }

    storeRecipes () {
        //const recipes = this.recipeService.getRecipes();
        //  this.http.put("https://angularcourseproject-2e57e-default-rtdb.firebaseio.com/recipes.json",recipes).subscribe((response =>{ 
        //      console.log(response);
        //  }));
    }
    loadRecipes () { 
     
        return this.http.get <Recipe[]>("https://angularcourseproject-2e57e-default-rtdb.firebaseio.com/recipes.json").pipe(map(response=>{
            return response.map(recipe=>{
                return {...recipe,ingredients:recipe.ingredients? recipe.ingredients:[]}
                })
            }
        ),
        tap(response=>{ 
            
                //console.log(response);
                //this.recipeService.setRecipes(response)
                this.store.dispatch(new fromRecipes.SetRecipes(response));
          
            }   
            )
        );
        
    }
}