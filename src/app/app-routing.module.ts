import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guards/auth.guard';
import { PageNotFoundComponent } from './global-shared/components/page-not-found/page-not-found.component';
import { ServerOfflineComponent } from './global-shared/components/server-down/server-offline.component';
import { UnauthorizedComponent } from './global-shared/components/unauthorized/unauthorized.component';

const routes: Routes = [
  {
    path: 'server-down',
    pathMatch: 'full',
    component: ServerOfflineComponent
  },
  {
    path: '',
    pathMatch: 'full',
    canMatch: [AuthGuard], //only use canMatch on the parent level for auth, use canActivate for children.
    loadChildren: () => import('./features/login/components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    canMatch: [AuthGuard],
    children: [
      {
        path: 'register',
        loadChildren: () => import('./features/login/components/register/register.module').then(m => m.RegisterModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import('./features/login/components/reset-password/reset-password.module').then(m => m.ResetPasswordModule)
      },
      {
        path: 'home',
        loadChildren: () => import('./features/home/components/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: 'unauthorized',
    pathMatch: 'full',
    component: UnauthorizedComponent
  },
  { path: 'notfound', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'notfound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
