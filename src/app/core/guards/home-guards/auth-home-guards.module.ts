import { NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HomeGuard } from './auth-home.guard';

@NgModule({
  declarations: [],
  imports: [],
  providers: [HomeGuard],
  exports: []
})
export class HomeGuardsModule { }