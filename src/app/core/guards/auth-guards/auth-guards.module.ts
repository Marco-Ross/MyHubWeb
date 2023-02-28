import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthGuard, CookieService],
  exports: []
})
export class AuthGuardsModule { }