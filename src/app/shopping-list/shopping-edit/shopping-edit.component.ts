import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListComponent } from '../shopping-list.component';
//import { ShoppingListService } from '../shopping-list.service';
import { AddIngredient, DeleteIngredient, UpdateIngredient } from '../store/shoppinglist.actions';
import * as fromShoppingList from '../store/shoppinglist.reducer'
import * as ShoppingListActions  from '../store/shoppinglist.actions';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild ("formElement") shoppingListForm : NgForm ;
  subscription:Subscription;
  editMode = false ;
  editedItem : Ingredient ;
   constructor(
     //private shoppingListService : ShoppingListService ,
     private store :Store<fromApp.AppState> ) { }

  ngOnInit(): void {
    this.subscription= this.store.select('shoppingList').subscribe(state=>{
      if (state.editedIngredientIndex<0){
        this.editMode=false;
        return ;
      }else {
        this.editMode=true;
        this.editedItem = state.editedIngredient;
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount : this.editedItem.amount,
        });
        
      }
    })
   
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onSubmit(formElement : NgForm){
    const value = formElement.value;
    const newIngredient = new Ingredient(value.name , value.amount); 
    if (this.editMode== true ){
      this.store.dispatch(new UpdateIngredient({  payload :newIngredient}));
      //this.shoppingListService.updateIngredient (this.editedItemIndex , newIngredient);
    }else {
      //this.shoppingListService.addNewIngredient(newIngredient)
      this.store.dispatch(new AddIngredient(newIngredient));
  
    }
    this.shoppingListForm.reset();
    this.editMode= false; 
    
   }
   onClearForm(){
     this.shoppingListForm.reset();
     this.editMode= false;
     this.store.dispatch(new ShoppingListActions.StopEdit());
   }
   onDelete(){

     if (this.editMode = true ){
       this.store.dispatch (new DeleteIngredient());
       //this.shoppingListService.deleteIngredient(this.editedItemIndex);
     }
     this.onClearForm();
   }


}
