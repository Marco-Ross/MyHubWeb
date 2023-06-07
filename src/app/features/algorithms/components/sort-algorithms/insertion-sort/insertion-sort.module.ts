import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { InsertionSortComponent } from './insertion-sort.component';

@NgModule({
  declarations: [
    InsertionSortComponent
  ],
  imports: [ComponentsModule],
  exports: [InsertionSortComponent]
})
export class InsertionSortModule { }