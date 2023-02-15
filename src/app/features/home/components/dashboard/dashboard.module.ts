import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardComponent2 } from './dashboard2.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardComponent2
  ],
  imports: [
    ComponentsModule
  ],
  exports: [DashboardComponent,DashboardComponent2]
})
export class DashboardModule { }