import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    ComponentsModule,
    HomeRoutingModule,
    DashboardModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }