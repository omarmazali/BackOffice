import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { AgentRegisterBody } from 'src/app/interfaces/AgentRegisterBody';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient,private auth:AuthService) {
  }
  url= "http://jabak-lah-backend.onrender.com";
  getAgencies(){
    return this.http.get(this.url+"/agencies",{
      headers:{
        "Authorization":"Bearer "+this.auth.getToken()
      }
    })
  }
  registerAgent(body:AgentRegisterBody){
    return this.http.post(this.url+"/agent/auth/register",body,{
      headers:{
        "Authorization":"Bearer "+this.auth.getToken()
      }
    })
  }
}
