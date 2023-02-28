import { NgModule } from '@angular/core';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import { ValidateEmailComponent } from './validate-email/validate-email.component';

@NgModule({
  declarations: [RegisterComponent, ValidateEmailComponent],
  imports: [RegisterRoutingModule, ComponentsModule, LoadButtonModule],
  exports: []
})
export class RegisterModule { }