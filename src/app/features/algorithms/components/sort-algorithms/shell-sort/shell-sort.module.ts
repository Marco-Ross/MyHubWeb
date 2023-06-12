import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { ShellSortComponent } from './shell-sort.component';

@NgModule({
  declarations: [
    ShellSortComponent
  ],
  imports: [ComponentsModule],
  exports: [ShellSortComponent]
})
export class ShellSortModule { }