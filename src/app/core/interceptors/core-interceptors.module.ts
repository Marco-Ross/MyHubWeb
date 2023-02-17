import { NgModule } from '@angular/core';
import { ApiRouteInterceptorProviders } from './api-route.interceptor';
import { AuthInterceptorProviders } from './authentication.interceptor';

@NgModule({
  declarations: [],
  imports: [],
  providers:[ApiRouteInterceptorProviders, AuthInterceptorProviders],
  exports:[]
})
export class CoreInterceptorsModule { }