import { NgModule } from '@angular/core';
import { NavBarModule } from 'src/app/features/nav-bar/nav-bar.module';
import { NavLayoutRoutingModule } from './nav-layout-routing.module';
import { NavLayoutComponent } from './nav-layout.component';

@NgModule({
  declarations: [
    NavLayoutComponent
  ],
  providers: [],
  imports: [NavBarModule, NavLayoutRoutingModule],
  exports: []
})
export class NavLayoutModule { }