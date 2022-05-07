import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

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
  private closeSub :Subscription;
  constructor(private authService : AuthService, private router :Router,private componentFactoryResolver:ComponentFactoryResolver  ) {
    
   }

  ngOnInit(): void {
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
    this.isLoading=true;
    if (this.isLoginMode){
      authObs = this.authService.login(email,password)
    }else {
      authObs = this.authService.signUp(email,password);
    }
    authObs.subscribe(
      resData=>{
      this.error = null ;
      console.log(resData);
      this.isLoading=false;
      this.router.navigate (['/recipes'])
    },errorMessage =>{
      
      this.isLoading=false;
      this.error= errorMessage;
      this.showErrorAlert(errorMessage);
    });
    authForm.reset();
  }
  closeAlert(){
    this.error=null;
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
  }
}
