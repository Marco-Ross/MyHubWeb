import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { PageLoadComponent } from './page-load.component';

@NgModule({
    declarations: [
        PageLoadComponent,
    ],
    providers: [],
    imports: [ComponentsModule],
    exports: [PageLoadComponent]
})
export class PageLoadModule { }