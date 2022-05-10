import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { take } from "rxjs/operators";
import { DataStorageService } from "../shared/data-storage.service";
import * as fromApp  from "../store/app.reducer";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";
import  * as RecipeActions from "./store/recipe.actions";

@Injectable({
    providedIn:"root"
})
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor ( private store :Store<fromApp.AppState>, private actions$ :Actions){
    
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        this.store.dispatch(new RecipeActions.FetchRecipes());
        return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES),take(1));

        
    }
}