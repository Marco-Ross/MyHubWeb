import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { HeapSortComponent } from './heap-sort.component';

@NgModule({
  declarations: [
    HeapSortComponent
  ],
  imports: [ComponentsModule],
  exports: [HeapSortComponent]
})
export class HeapSortModule { }