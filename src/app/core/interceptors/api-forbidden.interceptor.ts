import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { NavLayoutService } from "src/app/features/nav-bar/nav-layout.service";

@Injectable()
export class ApiForbiddenInterceptor implements HttpInterceptor
{
    constructor(private router: Router, private navLayoutService: NavLayoutService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        return next.handle(req).pipe(catchError(errorResponse =>
        {
            if (errorResponse instanceof HttpErrorResponse && errorResponse.status === 403)
            {
                this.router.navigate(['']);
                this.navLayoutService.signOut();
            }

            return throwError(() => errorResponse);
        }));
    }
}

export const ApiForbiddenInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ApiForbiddenInterceptor, multi: true }
];