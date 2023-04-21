import { NgModule } from '@angular/core';
import { HomeGuard } from './auth-home.guard';

@NgModule({
  declarations: [],
  imports: [],
  providers: [HomeGuard],
  exports: []
})
export class HomeGuardsModule { }