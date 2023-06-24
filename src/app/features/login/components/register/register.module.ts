import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';
import { UploadModule } from 'src/app/global-shared/components/upload-component/upload.module';
import { FocusModule } from 'src/app/global-shared/directives/focus/focus.module';
import { InfoFooterModule } from 'src/app/global-shared/components/info-footer/info-footer.module';

@NgModule({
  declarations: [RegisterComponent, RegisterCompleteComponent],
  providers: [],
  imports: [FontAwesomeModule, RegisterRoutingModule, ComponentsModule, LoadButtonModule, UploadModule, FocusModule, InfoFooterModule],
  exports: []
})
export class RegisterModule { }