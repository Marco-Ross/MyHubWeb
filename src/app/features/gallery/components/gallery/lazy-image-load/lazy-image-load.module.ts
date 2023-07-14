import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { LazyImageLoadDirective } from './lazy-image-load.directive';

@NgModule({
  declarations: [
    LazyImageLoadDirective
  ],
  providers: [],
  imports: [ComponentsModule],
  exports: [LazyImageLoadDirective]
})
export class LazyImageLoadModule { }