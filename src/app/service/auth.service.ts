import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './jwt/JwtService';
import { LoginBody } from '../interfaces/LoginBody';
import { LoginResponse } from '../interfaces/LoginResponse';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtService: JwtService, private router: Router) { }
  isLoggedIn = false;
  isAutheticated() {
    let token = localStorage.getItem("token")
    if (token === null) return false;
    return true;
  }

  login(form: LoginBody) {
    this.http.post<LoginResponse>("http://localhost:8090/agent/client/authenticate",form).subscribe(
      (data) =>{
        console.log(data)
        localStorage.setItem("token",data.token)
        localStorage.setItem("refreshToken", data.refreshToken)
        //
        this.router.navigateByUrl('/clients')
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
    return this.http.post<HttpEvent<any>>("http://localhost:8090/client/refresh",{token:refreshToken})
    
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
