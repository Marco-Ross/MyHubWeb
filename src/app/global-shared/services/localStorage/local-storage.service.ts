import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService
{
    constructor() { }

    public SaveData(key: string, value: string)
    {
        localStorage.setItem(key, value);
    }

    public GetData(key: string)
    {
        return localStorage.getItem(key);
    }
    
    public RemoveData(key: string)
    {
        localStorage.removeItem(key);
    }

    public ClearData()
    {
        localStorage.clear();
    }
}