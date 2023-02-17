import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardHome } from 'src/app/core/guards/auth-home.guard';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardComponent2 } from '../dashboard/dashboard2.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    canActivateChild: [AuthGuardHome],//used for roles or other permission checks.
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'dashboard2',
        component: DashboardComponent2
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
