import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreInterceptorsModule } from './core/interceptors/core-interceptors.module';
import { AuthGuardsModule } from './core/guards/auth-guards/auth-guards.module';
import { CoreAuthServicesModule } from './core/services/authentication-service/core-auth-service.module';
import { ThemeRenderer } from './global-shared/services/theme/theme.renderer';
import { WindowRefService } from './global-shared/services/window/WindowRefService.model';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,

    CoreInterceptorsModule,
    CoreAuthServicesModule,
    AuthGuardsModule
  ],
  providers: [ThemeRenderer, WindowRefService],
  bootstrap: [AppComponent]
})
export class AppModule { }
