import { NgModule } from '@angular/core';
import { InfoFooterComponent } from './info-footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [InfoFooterComponent],
    imports:[RouterModule],
    exports: [InfoFooterComponent]
})
export class InfoFooterModule { }
