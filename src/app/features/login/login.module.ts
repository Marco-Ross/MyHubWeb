import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  providers: [],
  imports: [
    LoginRoutingModule,
    ComponentsModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }