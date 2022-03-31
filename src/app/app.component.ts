import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayRecipes = true ;
  recipes(){
    return this.displayRecipes ; 
  }
 
  navigateTo(event){
      if (event == "Recipes") {
          this.displayRecipes =true;  
      }else {
        this.displayRecipes= false ;
      }
  }
}
