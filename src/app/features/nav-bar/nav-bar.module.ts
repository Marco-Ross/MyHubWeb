import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { NavBarComponent } from './nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NavBarComponent],
  imports: [ComponentsModule, RouterLinkActive, RouterLink, NgbCollapseModule, FontAwesomeModule],
  exports: [NavBarComponent]
})
export class NavBarModule { }