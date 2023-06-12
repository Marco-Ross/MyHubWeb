import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { BucketSortComponent } from './bucket-sort.component';

@NgModule({
  declarations: [
    BucketSortComponent
  ],
  imports: [ComponentsModule],
  exports: [BucketSortComponent]
})
export class BucketSortModule { }