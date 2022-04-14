import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector:'app-navigator',
    templateUrl:'./navigation.component.html',
    styleUrls:['./navigation.component.css'],
})
export class NavigationComponent{ 
    collapsed = true ;

    @Output () navigate = new EventEmitter <String> () ; 
   
}