import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacebookAccessTokenComponent } from './facebook-access-token.component';

const routes: Routes = [
  { path: 'complete', component: FacebookAccessTokenComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacebookAccessTokenRoutingModule { }
