import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginBody } from '../interfaces/LoginBody';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  constructor(public router:Router, private authService:AuthService,private toastr:ToastrService){}
  form:LoginBody = {
    username: "",
    password:""
  }

  submitLogin(){
    console.log(this.form);
    this.authService.login(this.form).subscribe(
      (data) =>{
        console.log(data)
        localStorage.setItem("token",data.token)
        localStorage.setItem("refreshToken",data.refreshToken)
        this.router.navigateByUrl('/create-agent')
      } ,
        
      (err:HttpErrorResponse) =>{
        console.log("login error");
        this.toastr.warning(err.error)
        console.log(err);
  
      }
    )
  }

  ngOnInit(): void {
  }

}
