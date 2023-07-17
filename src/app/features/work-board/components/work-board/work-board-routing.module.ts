import { inject, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardComponent2 } from '../dashboard/dashboard2.component';
import { WorkBoardComponent } from './work-board.component';
import { WorkBoardGuard } from 'src/app/core/guards/work-board-guards/auth-work-board.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: WorkBoardComponent
  },
  {
    path: '',
    canActivateChild: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(WorkBoardGuard).canActivateChild(next, state)],//used for roles or other permission checks.
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
export class WorkBoardRoutingModule { }
