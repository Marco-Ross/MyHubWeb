import { Injectable } from '@angular/core';
import { LocalStorageService } from '../localStorage/local-storage.service';
@Injectable({
    providedIn: 'root'
})
export class ThemeStorageService
{
    Key: string = "Theme";
    constructor(private localStorage: LocalStorageService) { }
    GetTheme(): string | null
    {
        return this.localStorage.GetData(this.Key);
    }
    
    UpdateTheme(theme: string): void
    {
        this.localStorage.SaveData(this.Key, theme);
    }
}