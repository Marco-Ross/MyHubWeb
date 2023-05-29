import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';
import { LoginContinueComponent } from './login-continue.component';

@NgModule({
  declarations: [
    LoginContinueComponent
  ],
  providers: [],
  imports: [FontAwesomeModule, ComponentsModule, RouterModule, LoadButtonModule],
  exports: [LoginContinueComponent]
})
export class LoginContinueModule { }