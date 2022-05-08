import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as AuthActions from './store/auth.actions';
import * as fromApp  from "../store/app.reducer";
export interface AuthResponseData{
    kind:string;
    idToken :string;
    email:string;
    refreshToken:string;
    expiresIn :string ;
    localId : string ;
    registered?:boolean ;
}
@Injectable({
    providedIn:'root'
})
export class AuthService { 
    //user = new BehaviorSubject<User>(null) ;
    private tokenExpirationTimer :any ;
    constructor(private http :HttpClient ,private router :Router ,private store :Store<fromApp.AppState>){
        
    }
    
    setLogoutTimer (expirationDuration : number ){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.store.dispatch(new AuthActions.Logout());
        },expirationDuration);
    }
    clearLogoutTimer( ){
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }
   
    
    

}