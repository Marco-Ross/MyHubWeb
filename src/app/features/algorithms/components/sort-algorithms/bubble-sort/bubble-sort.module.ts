import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { BubbleSortComponent } from './bubble-sort.component';

@NgModule({
  declarations: [
    BubbleSortComponent
  ],
  imports: [ComponentsModule],
  exports: [BubbleSortComponent]
})
export class BubbleSortModule { }