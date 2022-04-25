import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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
    constructor(private http :HttpClient ){
        
    }
    signUp(email:string,password:string){
        return  this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCoqqs0-01jcKGvs3BTfS6G-J19cu1LlYo",
        {email:email , password: password, returnSecureToken:true}).pipe(
            catchError(this.handleError),tap(
                resData => {
                    this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                }
            ));
    }
    login(email:string,password:string){
        return  this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCoqqs0-01jcKGvs3BTfS6G-J19cu1LlYo",
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
    }
    

}