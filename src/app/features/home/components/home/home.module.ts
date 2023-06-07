import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeGuardsModule } from 'src/app/core/guards/home-guards/auth-home-guards.module';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardComponent2 } from '../dashboard/dashboard2.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { WorkItemDescriptionComponent } from '../work-item-description/work-item-description.component';

@NgModule({
  declarations: [HomeComponent, DashboardComponent, DashboardComponent2, WorkItemDescriptionComponent],
  imports: [HomeRoutingModule, HomeGuardsModule, ComponentsModule, FontAwesomeModule],
  exports: []
})
export class HomeModule { }