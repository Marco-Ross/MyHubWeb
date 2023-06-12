import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { SelectionSortComponent } from './selection-sort.component';

@NgModule({
  declarations: [
    SelectionSortComponent
  ],
  imports: [ComponentsModule],
  exports: [SelectionSortComponent]
})
export class SelectionSortModule { }