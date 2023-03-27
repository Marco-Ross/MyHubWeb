import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { HomeGuard } from 'src/app/core/guards/home-guards/auth-home.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardComponent2 } from './dashboard/dashboard2.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    canActivateChild: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(HomeGuard).canActivateChild(next, state)],//used for roles or other permission checks.
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
