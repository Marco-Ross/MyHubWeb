import { NgModule } from '@angular/core';
import { ApiRouteInterceptorProviders } from './api-route.interceptor';
import { AuthInterceptorProviders } from './authentication.interceptor';
import { ServerOfflineInterceptorProviders } from './server-offline.interceptor';

@NgModule({
  declarations: [],
  imports: [],
  providers: [ApiRouteInterceptorProviders, ServerOfflineInterceptorProviders, AuthInterceptorProviders],
  exports: []
})
export class CoreInterceptorsModule { }