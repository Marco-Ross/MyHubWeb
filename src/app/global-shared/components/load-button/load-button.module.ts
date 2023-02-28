import { NgModule } from '@angular/core';
import { ComponentsModule } from '../../modules/components.module';
import { LoadButtonComponent } from './load-button.component';

@NgModule({
  declarations: [
    LoadButtonComponent
  ],
  providers: [],
  imports: [ComponentsModule],
  exports: [LoadButtonComponent]
})
export class LoadButtonModule { }