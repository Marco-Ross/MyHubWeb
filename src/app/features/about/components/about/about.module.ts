import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';
import { NgParticlesModule } from 'ng-particles';

@NgModule({
    declarations: [
        AboutComponent,
    ],
    providers: [],
    imports: [ComponentsModule, AboutRoutingModule, NgParticlesModule],
    exports: []
})
export class AboutModule { }