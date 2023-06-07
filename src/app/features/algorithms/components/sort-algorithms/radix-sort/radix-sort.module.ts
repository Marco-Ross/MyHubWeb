import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { RadixSortComponent } from './radix-sort.component';

@NgModule({
  declarations: [
    RadixSortComponent
  ],
  imports: [ComponentsModule],
  exports: [RadixSortComponent]
})
export class RadixSortModule { }