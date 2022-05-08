import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
//import { ShoppingListService } from './shopping-list.service';
import  * as fromShoppingList from './store/shoppinglist.reducer';
import * as ShoppingListActions from './store/shoppinglist.actions';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers:[]
})
export class ShoppingListComponent implements OnInit , OnDestroy {
  
  ingredients:Observable<{ ingredients:  Ingredient[] }>; 
  private igChangeSub : Subscription;
  constructor(
    //private shoppingListService : ShoppingListService,
    private store : Store<fromApp.AppState>) {
    
   }
  ngOnDestroy(): void {
   //this.igChangeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.ingredients= this.store.select('shoppingList');
    // this.igChangeSub =this.shoppingListService.ingredientsChanged.subscribe((ingredients)=>{
    //   this.ingredients= ingredients; 
    // })
    // this.ingredients=this.shoppingListService.getIngredients(); 
  }
  onEditItem(index: number  ){
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
  

}
