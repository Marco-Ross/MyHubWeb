import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { ButtonService } from 'src/app/global-shared/services/load-button/load-button.service';
import { ResetPasswordCompleteComponent } from './reset-password-complete/reset-password-complete.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    ResetPasswordCompleteComponent,
    ResetPasswordComponent
  ],
  providers: [ButtonService],
  imports: [FontAwesomeModule, ResetPasswordRoutingModule, ComponentsModule, RouterModule],
  exports: []
})
export class ResetPasswordModule { }
