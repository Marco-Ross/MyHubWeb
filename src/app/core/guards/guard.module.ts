import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuardHome } from './auth-home.guard';
import { AuthGuard } from './auth.guard';
import { LoginGuard } from './login.guard';

@NgModule({
  declarations: [],
  imports: [],
  providers:[AuthGuard, AuthGuardHome, LoginGuard, CookieService],
  exports:[]
})
export class GuardModule { }