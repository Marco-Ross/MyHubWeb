import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { PageNotFoundComponent } from './global-shared/components/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './global-shared/components/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'unauthorized',
    pathMatch: 'full',
    component: UnauthorizedComponent
  },
  {
    path: '',
    pathMatch: 'full',
    canMatch: [AuthGuard], //only use canMatch on the parent level for auth, use canActivate for children. 
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    canMatch: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./features/home/components/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
