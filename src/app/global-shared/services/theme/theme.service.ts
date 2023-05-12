import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ThemeService
{
    private readonly Key: string = "Theme";
    private readonly ApiController: string = "Users";

    constructor(private http: HttpClient) { }

    GetTheme(): Observable<any>
    {
        return this.http.get(this.ApiController + '/Theme');
    }

    UpdateTheme(theme: string): Observable<any>
    {
        let themeDto: any = { 'Theme': theme };
        return this.http.put(this.ApiController + '/Theme', themeDto);
    }
}