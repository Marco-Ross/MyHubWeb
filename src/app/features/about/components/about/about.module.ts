import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
    declarations: [
        AboutComponent,
    ],
    providers: [],
    imports: [ComponentsModule, AboutRoutingModule, FontAwesomeModule, ClipboardModule],
    exports: []
})
export class AboutModule { }