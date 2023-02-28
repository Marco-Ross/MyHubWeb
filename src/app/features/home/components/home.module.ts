import { NgModule } from '@angular/core';
import { HomeGuardsModule } from 'src/app/core/guards/home-guards/auth-home-guards.module';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardComponent2 } from './dashboard/dashboard2.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent, DashboardComponent2],
  imports: [
    HomeRoutingModule,
    HomeGuardsModule,
    ComponentsModule
  ],
  exports: []
})
export class HomeModule { }