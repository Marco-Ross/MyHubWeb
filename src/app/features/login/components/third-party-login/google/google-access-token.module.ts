import { NgModule } from '@angular/core';
import { GoogleAccessTokenComponent } from './google-access-token.component';
import { ComponentsModule } from 'src/app/global-shared/modules/components.module';
import { GoogleAccessTokenRoutingModule } from './google-access-token-routing.module';
import { GoogleAuthService } from './google-access-token.service';

@NgModule({
  declarations: [GoogleAccessTokenComponent],
  providers: [GoogleAuthService],
  imports: [GoogleAccessTokenRoutingModule, ComponentsModule],
  exports: []
})
export class GoogleAccessTokenModule { }