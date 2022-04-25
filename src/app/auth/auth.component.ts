import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true ;
  isLoading =false ;
  error :string= null ; 
  constructor(private authService : AuthService, private router :Router ) { }

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
    });
    authForm.reset();
  }
}
