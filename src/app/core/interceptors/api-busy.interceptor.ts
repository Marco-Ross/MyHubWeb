import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS, HttpEventType } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable()
export class ApiBusyInterceptor implements HttpInterceptor
{
    constructor(private toastr: ToastrService) { }

    activeToast: any = undefined;
    timeout: any = undefined;

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        if (!this.activeToast && !this.timeout)
            this.timeout = setTimeout(() =>
            {
                this.activeToast = this.toastr.warning('The servers are starting up. Please be patient.', '', { timeOut: 0, closeButton: true });
            }, 6000);

        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) =>
            {
                if (event.type === HttpEventType.Response)
                    this.removePopup();
            }),
            catchError(errorResponse =>
            {
                this.removePopup();

                return throwError(() => errorResponse);
            })
        );
    }

    private removePopup()
    {
        clearTimeout(this.timeout);

        if (this.activeToast)
            this.activeToast.toastRef.close();

        this.activeToast = undefined;
        this.timeout = undefined;
    }
}

export const ApiBusyInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ApiBusyInterceptor, multi: true }
];