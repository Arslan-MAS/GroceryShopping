import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers:[]
})
export class ShoppingListComponent implements OnInit , OnDestroy {
  
  ingredients:Ingredient[]; 
  private igChangeSub : Subscription;
  constructor(private shoppingListService : ShoppingListService) {
    
   }
  ngOnDestroy(): void {
   this.igChangeSub.unsubscribe();
  }

  ngOnInit(): void {
    this.igChangeSub =this.shoppingListService.ingredientsChanged.subscribe((ingredients)=>{
      this.ingredients= ingredients; 
    })
    this.ingredients=this.shoppingListService.getIngredients(); 
  }
  onEditItem(index: number  ){
    this.shoppingListService.startedEditing.next(index); 
  }
  

}
