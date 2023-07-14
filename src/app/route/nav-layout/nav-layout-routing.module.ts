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
                loadChildren: () => import('../../features/home/components/home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'settings',
                loadChildren: () => import('../../features/settings/components/settings/settings.module').then(m => m.SettingsModule)
            },
            {
                path: 'algorithms',
                loadChildren: () => import('../../features/algorithms/components/algorithms/algorithms.module').then(m => m.AlgorithmsModule)
            },
            {
                path: 'gallery',
                loadChildren: () => import('../../features/gallery/components/gallery/gallery.module').then(m => m.GalleryModule)
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NavLayoutRoutingModule { }