import { NgModule } from '@angular/core';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { FacebookAccessTokenComponent } from './facebook-access-token.component';
import { FacebookAuthService } from './facebook-login.service';
import { FacebookAccessTokenRoutingModule } from './facebook-access-token-routing.module';

@NgModule({
  declarations: [FacebookAccessTokenComponent],
  providers: [FacebookAuthService],
  imports: [FacebookAccessTokenRoutingModule, ComponentsModule],
  exports: []
})
export class FacebookAccessTokenModule { }