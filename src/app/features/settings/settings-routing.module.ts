import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: '', component: SettingsComponent },
  {
    path: '',
    children: [
      {
        path: 'change-email',
        loadChildren: () => import('../settings/components/settings/change-email/change-email.module').then(m => m.ChangeEmailModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
