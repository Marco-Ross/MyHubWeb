import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManageTitbitComponent } from './manage-titbit.component';

@NgModule({
    declarations: [
        ManageTitbitComponent,
    ],
    providers: [],
    imports: [ComponentsModule, FontAwesomeModule],
    exports: []
})
export class ManageTitbitModule { }