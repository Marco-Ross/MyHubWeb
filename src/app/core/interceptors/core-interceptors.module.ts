import { NgModule } from '@angular/core';
import { ApiForbiddenInterceptorProviders } from './api-forbidden.interceptor';
import { ApiRouteInterceptorProviders } from './api-route.interceptor';
import { ApiServerErrorInterceptorProviders } from './api-server-error.interceptor';
import { AuthInterceptorProviders } from './authentication.interceptor';
import { ServerOfflineInterceptorProviders } from './server-offline.interceptor';
import { ApiUnauthenticatedInterceptorProviders } from './api-unauthenticated.interceptor';
import { ApiBusyInterceptorProviders } from './api-busy.interceptor';

@NgModule({
  declarations: [],
  imports: [],
  providers: [ServerOfflineInterceptorProviders, ApiServerErrorInterceptorProviders, ApiForbiddenInterceptorProviders, ApiUnauthenticatedInterceptorProviders, AuthInterceptorProviders, ApiRouteInterceptorProviders, ApiBusyInterceptorProviders],
  exports: []
})
export class CoreInterceptorsModule { }