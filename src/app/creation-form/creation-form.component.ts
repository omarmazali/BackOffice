import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { Agency } from '../interfaces/Agency';
import { ApiService } from '../service/api/api.service';
import { AgentRegisterBody } from '../interfaces/AgentRegisterBody';

import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-creation-form',
  templateUrl: './creation-form.component.html',
  styleUrls: ['./creation-form.component.css']
})
export class CreationFormComponent implements OnInit{
  constructor(private api:ApiService,private auth:AuthService,private toastrService:ToastrService,private router:Router,private http:HttpClient){}

  selectedFile!:File;

  @ViewChild(ToastContainerDirective, { static: true })
  toastContainer!: ToastContainerDirective;

  @ViewChild('fileInputRef', { static: true }) fileInputRef!: ElementRef<HTMLInputElement>;

  getFile(){
    const fileInput = this.fileInputRef.nativeElement;
    return fileInput.files;
  }
  

  agencies:Agency[]=[]
  form:AgentRegisterBody={
    fname:"",
    lname:"",
    identityType:"",
    identityNumber:"",
    birthday:"",
    address:"",
    tel:"",
    password:"default",
    immatriculation:"",
    licenseNumber:"",
    idFilePath:"path",
    agencyId:0
  }

  ngOnInit(): void {
    this.toastrService.overlayContainer = this.toastContainer;
    this.api.getAgencies().subscribe(
      (data)=> {
        this.agencies = data as Agency[]
        console.log(data)
      },
      (err)=> {
        console.log(err);
      }
    )
    }

  uploadFile():Observable<any>{
    const formData = new FormData()
    let files = this.getFile()
    if(files==null) {
      return this.http.post('https://api.cloudinary.com/v1_1/diavwqgnf/raw/upload',formData)
    }
    formData.append('file',files[0])
    formData.append('upload_preset','z7vklzfm')
    return this.http.post('https://api.cloudinary.com/v1_1/diavwqgnf/raw/upload',formData)
  }


  submitRegister(event:any){
    
    console.log(this.form);
    this.uploadFile().subscribe((data)=>{
      console.log(data);
      this.form.idFilePath = data.url
      this.api.registerAgent(this.form).subscribe(
        (data)=>{
          
          console.log(data)
          if(data!= null && data.hasOwnProperty("token")){
            
            this.toastrService.success("Agent est ajouté!",'Succès',{
              timeOut:2000,
            })
          }
          else{
            this.toastrService.error("Agent n'est pas ajouté",'Erreur survenue',{
              timeOut:2000,
            })
          }
          
  
        },
        (err)=>{
          console.log(err);
        }
        )
    })
    
  }
  logout(){
    this.auth.logout()
    this.router.navigateByUrl('/')
  }
}

