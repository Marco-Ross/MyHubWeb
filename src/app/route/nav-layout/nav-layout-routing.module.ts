import { NgModule, inject } from '@angular/core';
import { Route, RouterModule, Routes, UrlSegment } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth-guards/auth.guard';
import { NavLayoutComponent } from 'src/app/route/nav-layout/nav-layout.component';

const routes: Routes = [
    {
        path: '',
        component: NavLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('../../features/work-board/components/work-board/work-board.module').then(m => m.WorkBoardModule)
            },
            {
                path: 'settings',
                canMatch: [(route: Route, segments: UrlSegment[]) => inject(AuthGuard).canMatch(route, segments)],
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