import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';

@NgModule({
  declarations: [RegisterComponent, RegisterCompleteComponent],
  providers: [],
  imports: [FontAwesomeModule, RegisterRoutingModule, ComponentsModule, LoadButtonModule],
  exports: []
})
export class RegisterModule { }