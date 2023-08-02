import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitbitsComponent } from './titbits.component';

const routes: Routes = [
    { path: '', component: TitbitsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TitbitsRoutingModule { }
