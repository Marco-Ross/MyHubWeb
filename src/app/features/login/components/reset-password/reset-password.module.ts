import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { ResetPasswordCompleteComponent } from './reset-password-complete/reset-password-complete.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';
import { FocusModule } from 'src/app/global-shared/directives/focus/focus.module';

@NgModule({
  declarations: [
    ResetPasswordCompleteComponent,
    ResetPasswordComponent
  ],
  providers: [],
  imports: [FontAwesomeModule, ResetPasswordRoutingModule, ComponentsModule, RouterModule, LoadButtonModule, FocusModule],
  exports: []
})
export class ResetPasswordModule { }
