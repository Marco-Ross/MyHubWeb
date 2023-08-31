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
                path: 'work-board',
                loadChildren: () => import('../../features/work-board/components/work-board/work-board.module').then(m => m.WorkBoardModule)
            },
            {
                path: 'titbits',
                loadChildren: () => import('../../features/titbits/components/titbits/titbits.module').then(m => m.TitbitsModule)
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
            },
            {
                path: 'about',
                loadChildren: () => import('../../features/about/components/about/about.module').then(m => m.AboutModule)
            },
            {
                path: 'feedback',
                loadChildren: () => import('../../features/feedback/components/feedback/feedback.module').then(m => m.FeedbackModule)
            },
            {
                path: '',
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