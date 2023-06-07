import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { MergeSortComponent } from './merge-sort.component';

@NgModule({
  declarations: [
    MergeSortComponent
  ],
  imports: [ComponentsModule],
  exports: [MergeSortComponent]
})
export class MergeSortModule { }