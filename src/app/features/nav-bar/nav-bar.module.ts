import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { NavBarComponent } from './nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SafeResourceUrlModule } from 'src/app/global-shared/pipes/safe-resource-url/safe-resource-url.module';

@NgModule({
  declarations: [NavBarComponent],
  imports: [ComponentsModule, RouterLinkActive, RouterLink, NgbCollapseModule, FontAwesomeModule, SafeResourceUrlModule],
  exports: [NavBarComponent]
})
export class NavBarModule { }