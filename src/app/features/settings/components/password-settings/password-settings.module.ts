import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { PasswordSettingsComponent } from './password-settings.component';
import { RouterModule } from '@angular/router';
import { LoadButtonModule } from 'src/app/global-shared/components/load-button/load-button.module';

@NgModule({
  declarations: [
    PasswordSettingsComponent
  ],
  imports: [ComponentsModule, RouterModule, LoadButtonModule],
  exports: [PasswordSettingsComponent]
})
export class PasswordSettingsModule { }