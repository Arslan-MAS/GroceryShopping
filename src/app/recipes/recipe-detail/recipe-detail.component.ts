import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/ingredient.model';
//import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { AddIngredients, ADD_INGREDIENTS } from 'src/app/shopping-list/store/shoppinglist.actions';
import  * as fromShoppingList from 'src/app/shopping-list/store/shoppinglist.reducer';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as fromApp from '../../store/app.reducer';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  public recipe:Recipe;  
  id : number;
  constructor(private recipeService :RecipeService,
    private route:ActivatedRoute ,private router :Router,
    private store: Store<fromApp.AppState>) {
    
   }

  ngOnInit(): void {

     this.route.params.pipe( 
       map( (params)=>{
       return +params['id']
    }
    ),switchMap((id)=>{
      this.id= id ;
      return this.store.select("recipes");
    })
    ).pipe(map((responseRecipes)=>{
      return responseRecipes.recipes.find((recipe,index)=>{
        return index===this.id;
      })
    })).subscribe(
      (recipe) =>{
        this.recipe= recipe;
      }
    )


    // this.route.params.subscribe((params:Params)=>{
    //   this.id=+params["id"];
    //   
    //   this.store.select("recipes").pipe(map((response)=>{
    //       return response.recipes.find((recipe,index)=>{
    //         return index===this.id;

    //       })
    //   })).subscribe((recipe )=> {
    //     this.recipe  =recipe;
    //   })
    // })
  }
  addToShoppingList(){
      this.store.dispatch(new AddIngredients(this.recipe.ingredients));
    
    
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe (this.id) ;
    this.router.navigate(['recipes']);
    //route
  }

}
