import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AuthLoginGuard } from './auth-login.guard';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthGuard, AuthLoginGuard],
  exports: []
})
export class AuthGuardsModule { }