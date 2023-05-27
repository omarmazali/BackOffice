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
  getAgencies(){
    return this.http.get("http://localhost:8090/agencies",{
      headers:{
        "Authorization":"Bearer "+this.auth.getToken()
      }
    })
  }
  registerAgent(body:AgentRegisterBody){
    return this.http.post("http://localhost:8090/agent/auth/register",body)
  }
}
