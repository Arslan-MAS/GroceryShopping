import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions ,ofType,Effect} from '@ngrx/effects'
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponseData, AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

const handleAuthentication = ( email :string, id:string , token:string  ,expiresIn :number) =>{

    const expirationDate = new Date(new Date().getTime()+ +expiresIn*1000);
    const user :User = new User (email, id ,token,expirationDate);
    
    localStorage.setItem('userData',JSON.stringify(user));
         return new AuthActions.Login({
        
            email:email,userId:id,token:token,date:expirationDate,redirect:true 
        
        });
 };
 const handleError = (errorRes) =>{
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
    return of( new AuthActions.LoginFail(errorMessage));
                
 }
 @Injectable()
export class AuthEffects {
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(AuthActions.LOGIN_START),
        switchMap((authData:AuthActions.LoginStart)=>{

        return  this.http .post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+environment.firebaseAPIKey,
            {
                email:authData.payload.email ,
                password: authData.payload.password, 
                returnSecureToken:true
            }
            ).pipe(
                tap (resData=> {
                    this.authService.setLogoutTimer(+resData.expiresIn*1000);
                }),
                map(
                    (resData=>{
                        return handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                    })
                ),
                catchError(
                    error => {
                       return handleError(error);
                    }
                ),
                
                );

            }),
        );

    @Effect({dispatch:false})
    authRedirect=this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATION_SUCCEEDED),
        tap(
            (payload:AuthActions.Login)=>{  
            if (payload.payload.redirect===true ) 
                this.router.navigate(['/']);

        })
    );
    @Effect ()
    signUp = this.actions$.pipe(
        ofType(AuthActions.SIGNUP_START),
        switchMap( (signupAction : AuthActions.SignUpStart) => {

                return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.firebaseAPIKey,
                {email:signupAction.payload.email , password: signupAction.payload.password, returnSecureToken:true}).pipe(
                    tap (resData=> {
                        this.authService.setLogoutTimer(+resData.expiresIn*1000);
                    }),
                    map( 
                        (resData=>{
                            return handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                        })
                        ),
                    catchError(error => {
                        return handleError(error);
                     })

                )
                
            }
        )
        
    )
    @Effect({dispatch:false })
    authLogout = this.actions$.pipe(ofType (AuthActions.LOGOUT),tap(()=>{
        this.authService.clearLogoutTimer();
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
    }));
    @Effect()
    autoLogin = this.actions$.pipe(ofType(AuthActions.AUTO_LOGIN),map(()=>{
        const userData:{
            email :string ,
            id : string ,
            _token : string , 
            _tokenExpirationDate :string 
        } = JSON.parse (localStorage.getItem('userData'));
        if (!userData){
            return {type :'DUMMY'} ;
        }else {
            const userLoaded :User = new User (userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
            if (userLoaded.token){
                const expirationTime = (new Date(userData._tokenExpirationDate)).getTime();
                const currentTime = new Date().getTime(); 
                const expirationDuration = expirationTime -currentTime ;
                this.authService.setLogoutTimer(expirationDuration);
                
                //this.user.next(userLoaded);
                return (
                        new AuthActions.Login(
                        {   email :userData.email,
                            userId:userData.id,
                            token : userData._token,
                            date :(new Date(userData._tokenExpirationDate)),
                            redirect:false,
                        }
                            )
                    );
                
                //this.autoLogout(expirationDuration);
            }
            return {type :'DUMMY'} ;
        }
    }))
    constructor(
        private actions$:Actions , 
        private http :HttpClient ,
        private router :Router,
        private authService :AuthService 
        ){

    }
}