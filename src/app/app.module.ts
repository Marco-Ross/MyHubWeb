import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreInterceptorsModule } from './core/interceptors/core-interceptors.module';
import { GuardModule } from './core/guards/guard.module';
import { CoreAuthServicesModule } from './core/services/authentication-service/core-auth-service.module';

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
    GuardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
