import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { AlgorithmsRoutingModule } from './algorithms-routing.module';
import { AlgorithmsComponent } from './algorithms.component';
import { AlgorithmComponentAnchorDirective } from './algorithm-component-anchor.directive';

@NgModule({
  declarations: [
    AlgorithmsComponent, AlgorithmComponentAnchorDirective
  ],
  imports: [AlgorithmsRoutingModule, ComponentsModule],
  exports: []
})
export class AlgorithmsModule { }