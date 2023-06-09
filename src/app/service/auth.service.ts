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
  url = "http://jabak-lah-backend.onrender.com";
  isLoggedIn = false;
  isAuthenticated(){
    let token = localStorage.getItem("token")
    if(token===null) return false;
    return true
  }
  

  login(form:LoginBody){
    return this.http.post<LoginResponse>(this.url+"/auth/authenticate",form)
  }

  refreshLogin():Observable<HttpEvent<any>>{
    let refreshToken = localStorage.getItem('refreshToken')|| '';
    return this.http.post<HttpEvent<any>>(this.url+"/auth/refresh",{token:refreshToken})
    
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
    this.router.navigateByUrl('/')
  }
}
