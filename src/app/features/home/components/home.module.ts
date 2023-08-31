import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NgParticlesModule } from 'ng-particles';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    providers: [],
    imports: [ComponentsModule, HomeRoutingModule, NgParticlesModule, FontAwesomeModule],
    exports: []
})
export class HomeModule { }