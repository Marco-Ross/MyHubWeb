import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginModule } from './features/login/login.module';
import { ApiRouteInterceptor } from './core/interceptors/api-route.interceptor';
import { HomeModule } from './features/home/home.module';
import { authInterceptorProviders } from './core/interceptors/authentication.interceptor';
import { CoreServicesModule } from './core/services/core-services.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    CoreServicesModule,

    LoginModule,
    HomeModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiRouteInterceptor,
      multi: true
    },
    authInterceptorProviders
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
