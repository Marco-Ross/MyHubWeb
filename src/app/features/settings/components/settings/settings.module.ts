import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { PopupModule } from 'src/app/global-shared/components/bootstrap-modal/popup.module';
import { AccountSettingsModule } from '../account/account-settings.module';
import { PasswordSettingsModule } from '../password-settings/password-settings.module';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [SettingsRoutingModule, ComponentsModule, AccountSettingsModule, PopupModule, PasswordSettingsModule],
  exports: []
})
export class SettingsModule { }