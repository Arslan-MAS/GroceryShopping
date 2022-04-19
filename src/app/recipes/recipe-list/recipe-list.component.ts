import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  constructor(private recipeService : RecipeService) { }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe () ;
  }

  ngOnInit(): void {
    this.recipeSubscription = this.recipeService.recipeTransmitter.subscribe((recipesReceived : Recipe[])=>{
      this.recipes = recipesReceived ;
      
    });
    this.recipes= this.recipeService.getRecipes();
  }

}
