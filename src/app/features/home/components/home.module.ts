import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    declarations: [
        HomeComponent,
    ],
    providers: [],
    imports: [ComponentsModule, HomeRoutingModule],
    exports: []
})
export class HomeModule { }