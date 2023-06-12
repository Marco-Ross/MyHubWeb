import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    LoginComponent
  ],
  providers: [],
  imports: [FontAwesomeModule, LoginRoutingModule, ComponentsModule, RouterModule, LoadButtonModule, OAuthModule.forRoot()],
  exports: []
})
export class LoginModule { }