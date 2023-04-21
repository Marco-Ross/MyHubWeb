import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from '../../settings-routing.module';

@NgModule({
  declarations: [
    SettingsComponent
  ],
  providers: [],
  imports: [SettingsRoutingModule, ComponentsModule],
  exports: []
})
export class SettingsModule { }