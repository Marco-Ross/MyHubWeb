import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ScriptAndStyleLoader
{
    constructor() { }

    loadScript(scriptUrl: string)
    {
        return new Promise((resolve, reject) =>
        {
            const scriptElement = document.createElement('script');
            scriptElement.src = scriptUrl;
            scriptElement.onload = resolve;
            document.body.appendChild(scriptElement);
        });
    }

    loadStyle(styleUrl: string)
    {
        return new Promise((resolve, reject) =>
        {
            const styleElement = document.createElement('link');
            styleElement.rel = 'stylesheet';
            styleElement.href = styleUrl;
            styleElement.onload = resolve;
            document.head.appendChild(styleElement);
        });
    }
}