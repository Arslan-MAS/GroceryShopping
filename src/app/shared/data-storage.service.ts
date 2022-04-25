import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import { take } from "rxjs-compat/operator/take";
import { map, tap,take, exhaustMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({
    providedIn:'root'
})
export class DataStorageService {

    constructor(private authService :AuthService, private http  :HttpClient ,private recipeService :RecipeService){

    }

    storeRecipes () {
        const recipes = this.recipeService.getRecipes();
         this.http.put("https://angularcourseproject-2e57e-default-rtdb.firebaseio.com/recipes.json",recipes).subscribe((response =>{ 
             console.log(response);
         }));
    }
    loadRecipes () { 
       return this.authService.user.pipe(take(1), exhaustMap (user=>{
            return this.http.get <Recipe[]>("https://angularcourseproject-2e57e-default-rtdb.firebaseio.com/recipes.json",
            {params: new HttpParams().set('auth',user.token)})

        }),map(response=>{
            return response.map(recipe=>{
                return {...recipe,ingredients:recipe.ingredients? recipe.ingredients:[]}
            })
        }),tap(response=>{ 
            
                //console.log(response);
                this.recipeService.setRecipes(response)
          
        }))
        
    }
}