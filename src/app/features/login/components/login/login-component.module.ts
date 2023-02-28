import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  providers: [],
  imports: [LoginRoutingModule, ComponentsModule, RouterModule, LoadButtonModule],
  exports: []
})
export class LoginComponentModule { }