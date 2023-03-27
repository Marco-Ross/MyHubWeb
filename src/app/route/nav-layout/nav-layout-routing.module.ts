import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavLayoutComponent } from 'src/app/route/nav-layout/nav-layout.component';

const routes: Routes = [
    {
        path: '',
        component: NavLayoutComponent,
        children: [
            {
                path: 'home',
                loadChildren: () => import('../../features/home/components/home.module').then(m => m.HomeModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NavLayoutRoutingModule { }