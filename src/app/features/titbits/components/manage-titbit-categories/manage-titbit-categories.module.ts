import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ManageTitbitCategoriesComponent } from './manage-titbit-categories.component';

@NgModule({
    declarations: [
        ManageTitbitCategoriesComponent,
    ],
    providers: [],
    imports: [ComponentsModule, FontAwesomeModule],
    exports: []
})
export class ManageTitbitCategoriesModule { }