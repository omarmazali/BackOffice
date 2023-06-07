import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginBody } from '../interfaces/LoginBody';
import { LoginResponse } from '../interfaces/LoginResponse';
import { JwtService } from './jwt/JwtService';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient,private jwtService:JwtService,private router:Router) { }
  isLoggedIn=false;
  isAuthenticated(){
    let token = localStorage.getItem("token")
    if(token===null) return false;
    return true
  }
  

  login(form:LoginBody){
    this.http.post<LoginResponse>("http://localhost:8090/auth/authenticate",form).subscribe(
      (data) =>{
        console.log(data)
        localStorage.setItem("token",data.token)
        localStorage.setItem("refreshToken",data.refreshToken)
        this.router.navigateByUrl('/create-agent')
        console.log(this.jwtService.decodeToken(data.token));
      } ,
        
      (err:HttpErrorResponse) =>{
        console.log("login error");
        console.log(err);
  
      }
    )
  }

  refreshLogin():Observable<HttpEvent<any>>{
    let refreshToken = localStorage.getItem('refreshToken')|| '';
    return this.http.post<HttpEvent<any>>("http://localhost:8090/auth/refresh",{token:refreshToken})
    
  }

  setToken(token:string){
    localStorage.setItem('token',token)
  }
  getToken(){
    return localStorage.getItem('token')
  }
  getRefreshToken(){
    return localStorage.getItem('refreshToken')
  }
  setRefreshToken(refreshToken:string){
    localStorage.setItem('token',refreshToken)
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    console.log("logout successful");
  }
}
