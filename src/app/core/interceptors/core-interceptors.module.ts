import { NgModule } from '@angular/core';
import { ApiRouteInterceptorProviders } from './api-route.interceptor';
import { ApiServerErrorInterceptorProviders } from './api-server-error.interceptor';
import { AuthInterceptorProviders } from './authentication.interceptor';
import { ServerOfflineInterceptorProviders } from './server-offline.interceptor';

@NgModule({
  declarations: [],
  imports: [],
  providers: [ApiRouteInterceptorProviders, ServerOfflineInterceptorProviders, ApiServerErrorInterceptorProviders, AuthInterceptorProviders],
  exports: []
})
export class CoreInterceptorsModule { }