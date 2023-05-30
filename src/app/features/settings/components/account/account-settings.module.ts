import { NgModule } from '@angular/core';
import { AccountSettingsComponent } from './account-settings.component';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { AccountSettingsService } from './account-settings.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UploadModule } from 'src/app/global-shared/components/upload-component/upload.module';
import { SafeResourceUrlModule } from 'src/app/global-shared/pipes/safe-resource-url/safe-resource-url.module';
import { RouterModule } from '@angular/router';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';

@NgModule({
  declarations: [
    AccountSettingsComponent
  ],
  providers: [AccountSettingsService],
  imports: [ComponentsModule, FontAwesomeModule, UploadModule, SafeResourceUrlModule, RouterModule, LoadButtonModule],
  exports: [AccountSettingsComponent]
})
export class AccountSettingsModule { }