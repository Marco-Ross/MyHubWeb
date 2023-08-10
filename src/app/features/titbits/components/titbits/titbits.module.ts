import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { TitbitsComponent } from './titbits.component';
import { TitbitsRoutingModule } from './titbits-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopupModule } from 'src/app/global-shared/components/bootstrap-modal/popup.module';
import { TitbitServiceModule } from '../../services/titbit.module';

@NgModule({
    declarations: [
        TitbitsComponent,
    ],
    providers: [],
    imports: [ComponentsModule, TitbitsRoutingModule, FontAwesomeModule, PopupModule, TitbitServiceModule],
    exports: []
})
export class TitbitsModule { }