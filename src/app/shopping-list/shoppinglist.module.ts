import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "../app-routing.module";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    exports :[]
    ,imports :[
        RouterModule.forChild([
            {path:"" , component:ShoppingListComponent}, 
        ]
            
        ),
        CommonModule,
         SharedModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
    ]
})
export class ShoppingListModule {



    
}