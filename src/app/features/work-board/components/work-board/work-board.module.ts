import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DashboardComponent2 } from '../dashboard/dashboard2.component';
import { WorkItemDescriptionComponent } from '../work-item-description/work-item-description.component';
import { WorkBoardComponent } from './work-board.component';
import { WorkBoardRoutingModule } from './work-board-routing.module';
import { WorkBoardGuardsModule } from 'src/app/core/guards/work-board-guards/auth-work-board-guards.module';

@NgModule({
  declarations: [WorkBoardComponent, DashboardComponent, DashboardComponent2, WorkItemDescriptionComponent],
  imports: [WorkBoardRoutingModule, WorkBoardGuardsModule, ComponentsModule, FontAwesomeModule],
  exports: []
})
export class WorkBoardModule { }