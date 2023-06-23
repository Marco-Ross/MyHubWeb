import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { LoginContinueModule } from 'src/app/features/login/components/login/login-form/login-continue.module';
import { ChangeEmailRoutingModule } from './change-email-routing.module';
import { ChangeEmailService } from './change-email.service';
import { ChangeEmailCompleteComponent } from './change-email-complete/change-email-complete.component';
import { FocusModule } from 'src/app/global-shared/directives/focus/focus.module';

@NgModule({
  declarations: [
    ChangeEmailComponent,
    ChangeEmailCompleteComponent
  ],
  providers: [ChangeEmailService],
  imports: [ChangeEmailRoutingModule, ComponentsModule, RouterModule, LoadButtonModule, FontAwesomeModule, LoginContinueModule, FocusModule],
  exports: []
})
export class ChangeEmailModule { }