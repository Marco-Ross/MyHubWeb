import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { ButtonService } from 'src/app/global-shared/services/load-button/load-button.service';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [RegisterComponent, RegisterCompleteComponent],
  providers: [ButtonService],
  imports: [FontAwesomeModule, RegisterRoutingModule, ComponentsModule],
  exports: []
})
export class RegisterModule { }