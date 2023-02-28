import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ApiRouteInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 0){
                this.router.navigate(['server-down']);
            }

            return throwError(() => error);
        }));
    }
}

export const ServerOfflineInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ApiRouteInterceptor, multi: true }
];