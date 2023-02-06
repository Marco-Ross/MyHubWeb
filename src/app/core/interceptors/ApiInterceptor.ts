import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.development";

export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiRequest = req.clone({ url: environment.API_URL + req.url });
        
        return next.handle(apiRequest);
    }

}
//Can add a base url identifier if needed in future. 
//E.g. add @google to initial request and replace that with its baseUrl in here. Default can always be my app.