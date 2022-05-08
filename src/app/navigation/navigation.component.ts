import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";
import { DataStorageService } from "../shared/data-storage.service";
import { AppState } from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";

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
    constructor ( private dataStorageService :DataStorageService,private authService :AuthService, private store : Store<AppState> ){

    }
    ngOnInit(): void {
        this.authServiceSubscription= this.store.select('auth').subscribe(
            authState => 
            {this.user = authState.user ;}

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
    onLogout(){{
        
        this.store.dispatch(new AuthActions.Logout());
    }}
}