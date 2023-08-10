import { APP_INITIALIZER, NgModule, RendererFactory2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreInterceptorsModule } from './core/interceptors/core-interceptors.module';
import { AuthGuardsModule } from './core/guards/auth-guards/auth-guards.module';
import { CoreAuthServicesModule } from './core/services/authentication-service/core-auth-service.module';
import { ThemeRenderer } from './global-shared/services/theme/theme.renderer';
import { WindowRefService } from './global-shared/services/window/window-ref.service';
import { AppInitialize } from './app-initialize.service';
import { CookieService } from 'ngx-cookie-service';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { LocalStorageOAuthStorage } from './global-shared/services/localStorage/services/oauth-local-storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    CoreInterceptorsModule,
    CoreAuthServicesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    AuthGuardsModule,
    OAuthModule.forRoot()
  ],
  providers: [
    ThemeRenderer,
    CookieService,
    WindowRefService,
    {provide: OAuthStorage, useClass: LocalStorageOAuthStorage},
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitialize,
      deps: [ThemeRenderer, RendererFactory2],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
