import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { QuickSortComponent } from './quick-sort.component';

@NgModule({
  declarations: [
    QuickSortComponent
  ],
  imports: [ComponentsModule],
  exports: [QuickSortComponent]
})
export class QuickSortModule { }