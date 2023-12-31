import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { TitbitsComponent } from './titbits.component';
import { TitbitsRoutingModule } from './titbits-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PopupModule } from 'src/app/global-shared/components/bootstrap-modal/popup.module';
import { TitbitServiceModule } from '../../services/titbit.module';
import { PageLoadModule } from 'src/app/global-shared/components/loading/page-loading.module';

@NgModule({
    declarations: [
        TitbitsComponent,
    ],
    providers: [],
    imports: [ComponentsModule, TitbitsRoutingModule, FontAwesomeModule, PopupModule, TitbitServiceModule, PageLoadModule],
    exports: []
})
export class TitbitsModule { }