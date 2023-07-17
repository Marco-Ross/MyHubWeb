import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class ApiUnauthenticatedInterceptor implements HttpInterceptor
{
    constructor(private toastr: ToastrService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(req).pipe(catchError(errorResponse =>
        {
            if (errorResponse instanceof HttpErrorResponse && errorResponse.status === 401)
            {
                this.toastr.error("Must be signed in to do that.");

                return throwError(() => errorResponse);
            }

            return next.handle(req);
        }));
    }
}

export const ApiUnauthenticatedInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ApiUnauthenticatedInterceptor, multi: true }
];