
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import * as fromAppStore from '../store/app.reducer';
import { AuthResponseData } from './auth.service';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit , OnDestroy {
  isLoginMode = true ;
  isLoading =false ;
  error :string= null ; 
  @ViewChild(PlaceHolderDirective) alertHost :PlaceHolderDirective ;
  private storeSub :Subscription;
  private closeSub :Subscription;
  constructor( private componentFactoryResolver:ComponentFactoryResolver , private store : Store<fromAppStore.AppState>  ) {
    
   }

  ngOnInit(): void {
    this.storeSub=this.store.select('auth').subscribe(
      authState => {
        this.isLoading= authState.loading;
        this.error= authState.error;
        
        if (this.error )
          this.showErrorAlert(this.error);
      }
    );
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode ;

  }
  onSubmitForm(authForm:NgForm){
    if (!authForm.valid){
      return ;
    }
    console.log(authForm.value);
    const email = authForm.value.email ;
    const password = authForm.value.password ;
    var authObs : Observable<AuthResponseData>;
   
    if (this.isLoginMode){
      // authObs = this.authService.login(email,password)
      this.store.dispatch(new AuthActions.LoginStart( {email,password}));
    }else {
      this.store.dispatch(new AuthActions.SignUpStart({email,password}));
    }
    
    // authObs.subscribe(
    //   resData=>{
    //   this.error = null ;
    //   console.log(resData);
    //   this.isLoading=false;
    //   this.router.navigate (['/recipes'])
    // },errorMessage =>{
      
    //   this.isLoading=false;
    //   this.error= errorMessage;
    //   this.showErrorAlert(errorMessage);
    // });
    authForm.reset();
  }
  closeAlert(){
     this.store.dispatch(new AuthActions.ClearError());
  }
  private showErrorAlert(errorMessage:string){
    var alertCmpFactory =this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainer= this.alertHost.viewContainerRef;
    hostViewContainer.clear();
    const componentRef = hostViewContainer.createComponent(alertCmpFactory);
    componentRef.instance.message=errorMessage;
    this.closeSub= componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostViewContainer.clear();
    })

  }
  ngOnDestroy(): void {
    if (this.closeSub){
      this.closeSub.unsubscribe();
    }
    if (this.storeSub){
      this.storeSub.unsubscribe();
    }
  }
}
