import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreationFormComponent } from './creation-form/creation-form.component';
import { AuthGuard } from './guard/auth.guard';



const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'create-agent', component: CreationFormComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
