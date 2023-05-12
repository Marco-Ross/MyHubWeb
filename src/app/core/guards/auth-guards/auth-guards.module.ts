import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [],
  imports: [],
  providers: [AuthGuard],
  exports: []
})
export class AuthGuardsModule { }