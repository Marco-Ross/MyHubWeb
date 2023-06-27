import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { GithubAccessTokenComponent } from './github-access-token.component';
import { GithubAuthService } from './github-login.service';
import { GithubAccessTokenRoutingModule } from './github-access-token-routing.module';

@NgModule({
  declarations: [GithubAccessTokenComponent],
  providers: [GithubAuthService],
  imports: [GithubAccessTokenRoutingModule, ComponentsModule],
  exports: []
})
export class GithubAccessTokenModule { }