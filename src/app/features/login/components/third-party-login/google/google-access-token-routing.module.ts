import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoogleAccessTokenComponent } from './google-access-token.component';

const routes: Routes = [
  {
    path: 'complete',
    component: GoogleAccessTokenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoogleAccessTokenRoutingModule { }
