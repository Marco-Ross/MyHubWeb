import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { BinarySearchComponent } from './binary-search.component';

@NgModule({
  declarations: [
    BinarySearchComponent
  ],
  imports: [ComponentsModule],
  exports: [BinarySearchComponent]
})
export class BinarySearchModule { }