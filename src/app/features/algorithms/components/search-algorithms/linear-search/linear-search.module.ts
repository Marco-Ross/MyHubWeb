import { NgModule } from '@angular/core';
import { LinearSearchComponent } from './linear-search.component';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';

@NgModule({
  declarations: [
    LinearSearchComponent
  ],
  imports: [ComponentsModule],
  exports: [LinearSearchComponent]
})
export class LinearSearchModule { }