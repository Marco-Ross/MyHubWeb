import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { DeleteAccountSettingsComponent } from './delete-account-settings.component';

@NgModule({
  declarations: [
    DeleteAccountSettingsComponent
  ],
  imports: [ComponentsModule],
  exports: [DeleteAccountSettingsComponent]
})
export class DeleteAccountSettingsModule { }