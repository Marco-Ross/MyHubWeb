import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  providers: [],
  imports: [FontAwesomeModule, LoginRoutingModule, ComponentsModule, RouterModule, LoadButtonModule],
  exports: []
})
export class LoginModule { }