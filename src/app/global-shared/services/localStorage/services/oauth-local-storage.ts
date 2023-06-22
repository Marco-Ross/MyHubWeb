import { Injectable } from "@angular/core";
import { OAuthStorage } from "angular-oauth2-oidc";
import { LocalStorageService } from "../local-storage.service";

@Injectable({ providedIn: 'root' })
export class LocalStorageOAuthStorage implements OAuthStorage
{
    constructor(private localStorageService: LocalStorageService) { }

    getItem(key: string): string | null
    {
        return this.localStorageService.GetData(key);
    }

    removeItem(key: string): void
    {
        this.localStorageService.RemoveData(key);
    }

    setItem(key: string, value: string): void
    {
        this.localStorageService.SaveData(key, value);
    }
}