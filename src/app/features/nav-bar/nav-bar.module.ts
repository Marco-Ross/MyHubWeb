import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { NavBarComponent } from './nav-bar.component';

@NgModule({
  declarations: [NavBarComponent],
  imports: [ComponentsModule, RouterLinkActive, RouterLink, NgbCollapseModule],
  exports: [NavBarComponent]
})
export class NavBarModule { }