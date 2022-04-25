import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector:'app-navigator',
    templateUrl:'./navigation.component.html',
    styleUrls:['./navigation.component.css'],
})
export class NavigationComponent implements OnInit , OnDestroy { 
    collapsed = true ;
    private authServiceSubscription :Subscription;
    public user :User;
    @Output () navigate = new EventEmitter <String> () ; 
    constructor ( private dataStorageService :DataStorageService,private authService :AuthService ){

    }
    ngOnInit(): void {
        this.authServiceSubscription= this.authService.user.subscribe(
            user=> 
            {this.user = user ;}

        );
    }
    ngOnDestroy(): void {
         this.authServiceSubscription.unsubscribe();
    }
    onSaveData(){
        this.dataStorageService.storeRecipes();
    }
    onFetchData(){
        this.dataStorageService.loadRecipes().subscribe();
    }
}