import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GithubAccessTokenComponent } from './github-access-token.component';

const routes: Routes = [
  {
    path: 'complete',
    component: GithubAccessTokenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GithubAccessTokenRoutingModule { }
