import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListComponent } from '../shopping-list.component';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit , OnDestroy {
  @ViewChild ("formElement") shoppingListForm : NgForm ;
  subscription:Subscription;
  editMode = false ;
  editedItemIndex :number; 
  editedItem : Ingredient ;
   constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
    this.subscription= this.shoppingListService.startedEditing.subscribe((index : number)=>{
      this.editMode=true; 
      this.editedItemIndex = index ;
      this.editedItem = this.shoppingListService.getIngredient(index );
      this.shoppingListForm.setValue({
        name: this.editedItem.name,
        amount : this.editedItem.amount,
      })
    })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  onSubmit(formElement : NgForm){
    const value = formElement.value;
    const newIngredient = new Ingredient(value.name , value.amount); 
    if (this.editMode== true ){
      this.shoppingListService.updateIngredient (this.editedItemIndex , newIngredient);
    }else {
      this.shoppingListService.addNewIngredient(newIngredient)
  
    }
    this.shoppingListForm.reset();
    this.editMode= false; 
    
   }
   onClearForm(){
     this.shoppingListForm.reset();
     this.editMode= false;
   }
   onDelete(){

     if (this.editMode = true ){
       this.shoppingListService.deleteIngredient(this.editedItemIndex);
     }
     this.onClearForm();
   }


}
