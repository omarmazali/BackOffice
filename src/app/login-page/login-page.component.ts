import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginBody } from '../interfaces/LoginBody';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  constructor(public router:Router, private authService:AuthService){}
  form:LoginBody = {
    tel: "",
    password:""
  }

  submitLogin(){
    console.log(this.form);
    this.authService.login(this.form)
  }

  ngOnInit(): void {
  }

}
