import { User } from "../user.model";
import * as  AuthActions  from "./auth.actions";

export interface State {
    error :string ;
    user : User ;
    loading :boolean ;
}
const initialState :State  = {
    user : null ,
    error : null ,
    loading :false ,
}
export function authReducer (state:State = initialState  , action :AuthActions.AuthActions) {

    switch (action.type ){
        case  AuthActions.AUTHENTICATION_SUCCEEDED :
            const usern = new User (action.payload.email,action.payload.userId,action.payload.token,action.payload.date);
            return {
                ...state, 
                user :usern,
                error :null ,
                loading :false ,
            }
        case AuthActions.LOGOUT :
            return {
                ...state, 
                                
                user :null,
                
                error :null ,
                
                loading :false ,


            }

        case AuthActions.SIGNUP_START:
        case AuthActions.LOGIN_START :
            return {
                ...state, 
                error :null ,
                loading :true ,
            }
        case AuthActions.AUTHENTICATION_FAIL :
            return {
                ...state, 
                error :action.payload ,
                user: null ,
                loading :false ,
            }
        case AuthActions.CLEAR_ERROR:
            return { 
                ...state ,
                error:null
            }
        default :
            return state ;

    }
    return state ;
}