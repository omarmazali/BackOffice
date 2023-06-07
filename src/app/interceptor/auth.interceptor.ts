import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private service:AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    
    return next.handle(request).pipe(catchError((err:HttpErrorResponse) => {
      if(err && err.status===500 && err.error.message==="User not found"){
        this.service.logout();
        this.router.navigateByUrl("/")
      }
      
      if(err && err.status === 401 ){

        if(err.error['error']==='Token expired'){
          console.log("token expired, generating a new one");
          
          return this.handleRefreshToken(request,next)
        }

        if(err.error['error']==='Agent not found'){
          console.log("Agent not found")
          this.service.logout()
          return throwError(err)
        }
        
        this.service.logout();
        return throwError(err)
      }
      return throwError(err);
    }));
  }

  private handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
    
    return this.service.refreshLogin().pipe(

      switchMap((data: any) => {
        console.log("token found and affected");
        this.service.setToken(data.token)
        
        return next.handle(this.addTokenToRequest(request))
      }),
      catchError(errodata=>{
        
        this.service.logout()
        console.log(errodata);
        return throwError(errodata)
      })
    );
  }
  private addTokenToRequest(request: HttpRequest<any>): HttpRequest<any> {
    
    const token = this.service.getToken()

    // Clone the request and add the authorization header
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
