import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService
{
    ApiController: string = "Users";

    constructor(private http: HttpClient) { }

    GetTheme(): Observable<any>
    {
        return this.http.get(this.ApiController + '/Theme');
    }

    UpdateTheme(theme: string): Observable<any>
    {
        let themeOptions: any = { 'Theme': theme };
        return this.http.put(this.ApiController + '/Theme', themeOptions);
    }
}