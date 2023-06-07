import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { FuzzySearchComponent } from './fuzzy-search.component';
import { ColumnPipeModule } from 'src/app/global-shared/pipes/ng-for/column.module';
@NgModule({
  declarations: [
    FuzzySearchComponent
  ],
  imports: [ComponentsModule, ColumnPipeModule],
  exports: [FuzzySearchComponent]
})
export class FuzzySearchModule { }