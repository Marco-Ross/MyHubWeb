import { Injectable } from '@angular/core';
import { ICustomWindow } from './ICustomWindow.model';

function getWindow(): any
{
    return window;
}

@Injectable()
export class WindowRefService
{
    get nativeWindow(): ICustomWindow
    {
        return getWindow();
    }
}