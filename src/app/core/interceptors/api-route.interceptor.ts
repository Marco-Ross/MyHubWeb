import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class ApiRouteInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        if (req.url.includes("https://"))
            return next.handle(req);
            
        const apiRequest = req.clone({ url: environment.API_URL + req.url, withCredentials: true });

        return next.handle(apiRequest);
    }
}

export const ApiRouteInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: ApiRouteInterceptor, multi: true }
];

//Can add a base url identifier if needed in future.
//E.g. add @google to initial request and replace that with its baseUrl in here. Default can always be my app.