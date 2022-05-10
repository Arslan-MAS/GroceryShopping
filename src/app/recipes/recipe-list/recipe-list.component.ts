import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.reducer';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy  {
  recipeSubscription :Subscription; 
  recipes : Recipe[];
  constructor(private recipeService : RecipeService , private store :Store<AppState>) { }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe () ;
  }

  ngOnInit(): void {
    this.recipeSubscription = this.store.select('recipes').pipe(
      map ((recipesResponse ) => {

        return recipesResponse.recipes;

    })).subscribe(
      (recipesReceived )=>{
      this.recipes = recipesReceived ;
      
    });

    //this.recipes= this.recipeService.getRecipes();
    


  }
}