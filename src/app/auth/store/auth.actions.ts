import { Action } from "@ngrx/store";
export const LOGIN_START = "LOGIN_START";
export const AUTHENTICATION_FAIL = "LOGIN_FAIL";
export const SIGNUP_START = "SIGN_UP";
export const AUTHENTICATION_SUCCEEDED= "LOGIN";
export const LOGOUT = "LOGOUT";
export const CLEAR_ERROR= "CLEAR_ERROR";
export class Login implements Action {
    readonly type= AUTHENTICATION_SUCCEEDED ;
    constructor (public payload :{ email :string , userId :string, token :string , date:Date}){

    } 
}
export class Logout implements Action {
    readonly type = LOGOUT;
   
}

export class LoginStart implements Action {
    readonly type = LOGIN_START;
    constructor (public payload : { email :string ,  password :string }){}
}
export class LoginFail implements Action {
    readonly type = AUTHENTICATION_FAIL;
    constructor (public payload :string  ){}
}
export class SignUpStart implements Action {
    readonly type = SIGNUP_START;
    constructor (public payload : {email :string , password :string}  ){}
}export class ClearError implements Action {
    readonly type = CLEAR_ERROR;
    constructor (  ){}
}
export type AuthActions =  ClearError|Logout | Login | LoginFail | LoginStart |SignUpStart;
