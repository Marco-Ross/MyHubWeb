import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  { path: ':UserId/:RegisterToken', component: RegisterCompleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
