import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { DeleteAccountSettingsComponent } from './delete-account-settings.component';
import { FocusModule } from 'src/app/global-shared/directives/focus/focus.module';

@NgModule({
  declarations: [
    DeleteAccountSettingsComponent
  ],
  imports: [ComponentsModule, FocusModule],
  exports: [DeleteAccountSettingsComponent]
})
export class DeleteAccountSettingsModule { }