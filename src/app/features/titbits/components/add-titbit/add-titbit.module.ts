import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTitbitComponent } from './add-titbit.component';

@NgModule({
    declarations: [
        AddTitbitComponent,
    ],
    providers: [],
    imports: [ComponentsModule, FontAwesomeModule],
    exports: []
})
export class AddTitbitModule { }