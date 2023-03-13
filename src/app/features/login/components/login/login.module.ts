import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { ButtonService } from 'src/app/global-shared/services/load-button/load-button.service';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  providers: [ButtonService],
  imports: [FontAwesomeModule, LoginRoutingModule, ComponentsModule, RouterModule],
  exports: []
})
export class LoginModule { }