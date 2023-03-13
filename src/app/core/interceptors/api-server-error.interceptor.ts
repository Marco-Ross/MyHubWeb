import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ApiServerErrorInterceptor implements HttpInterceptor
{
    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(req).pipe(catchError(errorResponse =>
        {
            if (errorResponse instanceof HttpErrorResponse && errorResponse.status === 500){
                alert('Server error:' + errorResponse.error.Message +'\n Internal error:' + errorResponse.error.InnerMessage);
                errorResponse = {};
            }

            return throwError(() => errorResponse);
        }));
    }
}

export const ApiServerErrorInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ApiServerErrorInterceptor, multi: true }
];