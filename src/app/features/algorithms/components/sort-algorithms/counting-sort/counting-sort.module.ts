import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { CountingSortComponent } from './counting-sort.component';

@NgModule({
  declarations: [
    CountingSortComponent
  ],
  imports: [ComponentsModule],
  exports: [CountingSortComponent]
})
export class CountingSortModule { }