import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import { environment } from "src/environments/environment";
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
    user = new BehaviorSubject<User>(null) ;
    private tokenExpirationTimer :any ;
    constructor(private http :HttpClient ,private router :Router){
        
    }
    signUp(email:string,password:string){
        return  this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseAPIKey,
        {email:email , password: password, returnSecureToken:true}).pipe(
            catchError(this.handleError),tap(
                resData => {
                    this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                }
            ));
    }
    login(email:string,password:string){
        return  this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseAPIKey,
        {
            email:email ,
             password: password, 
             returnSecureToken:true}).pipe(
            catchError(
                    this.handleError),tap(
                        resData => {
                            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                        }
                    ));
    }
    autoLogin (){
        const userData:{
            email :string ,
            id : string ,
            _token : string , 
            _tokenExpirationDate :string 
        } = JSON.parse (localStorage.getItem('userData'));
        if (!userData){
            return;
        }else {
            const userLoaded :User = new User (userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
            if (userLoaded.token){
                this.user.next(userLoaded);
                const expirationTime = (new Date(userData._tokenExpirationDate)).getTime();
                const currentTime = new Date().getTime(); 
                const expirationDuration = expirationTime -currentTime ;
                this.autoLogout(expirationDuration);
            }
            return ;
        }
    }
    logout (){
        this.user.next(null);
        this.router.navigate (['./auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer ){
            clearTimeout(this.tokenExpirationTimer);
        }

    }
    autoLogout (expirationDuration : number ){
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        },expirationDuration);
    }
    private handleError (errorRes :HttpErrorResponse){
        let errorMessage = "An Unexpected Error Occured"; 
        console.log(errorRes);
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage= 'This Email Exists Already';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage="This Email Doesn't Exist";
                break;
            case 'INVALID_PASSWORD':
                errorMessage='This password is not correct'; 
                break ; 
            
        }
         return throwError(errorMessage);
    }
    private handleAuthentication ( email :string, id:string , token:string  ,expiresIn :number){
        const expirationDate = new Date(new Date().getTime()+ expiresIn*1000);
        const user = new User (email,id,token,expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }
    

}