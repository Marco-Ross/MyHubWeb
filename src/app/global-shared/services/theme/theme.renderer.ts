import { Injectable, Renderer2 } from '@angular/core';
import { ThemeConstants } from '../../constants/theme.constants';
import { WindowRefService } from '../window/window-ref.service';
import { BehaviorSubject } from 'rxjs';
import { ThemeStorageService } from './theme-storage.service';
import { ThemeService } from './theme.service';

@Injectable()
export class ThemeRenderer
{
    public renderer!: Renderer2;

    private currentTheme = new BehaviorSubject('');
    private isThemeLoading = new BehaviorSubject(false);

    private darkListener: any;
    private lightListener: any;

    constructor(private window: WindowRefService, private themeStorage: ThemeStorageService, private themeService: ThemeService)
    {
        this.mediaDark = this.mediaDark.bind(this);
        this.mediaLight = this.mediaLight.bind(this);
    }

    public setLoggedOutTheme()
    {
        this.window.nativeWindow.document.documentElement.style.cssText = '';
        this.updateTheme(ThemeConstants.SystemTheme);
        this.currentTheme.next(ThemeConstants.SystemTheme);
    }

    public setCurrentTheme()
    {
        return this.themeService.GetTheme().subscribe({
            next: (themeOptions: any) =>
            {
                this.window.nativeWindow.document.documentElement.style.cssText = '';
                let setTheme = this.updateTheme(themeOptions.theme);
                this.themeStorage.UpdateTheme(setTheme);
                this.currentTheme.next(themeOptions.theme || ThemeConstants.SystemTheme);
            }
        });
    }

    public setCurrentThemeLogin()
    {
        this.isThemeLoading.next(true);

        this.setCurrentTheme().add(() =>
        {
            this.isThemeLoading.next(false);
        });
    }

    public getIsThemeLoading()
    {
        return this.isThemeLoading;
    }

    public changeTheme(theme: string)
    {
        let setTheme = this.updateTheme(theme);
        this.themeService.UpdateTheme(theme).subscribe();
        this.themeStorage.UpdateTheme(setTheme);
        this.currentTheme.next(theme);
    }

    private updateTheme(theme: string | null)
    {
        let newTheme = Object.values(ThemeConstants).find(x => x == theme) ?? ThemeConstants.SystemTheme;

        if (newTheme == ThemeConstants.SystemTheme)
            return this.setSystemTheme();
        else
        {
            this.removeSystemListeners();
            this.updateThemeClass(newTheme);
        }

        return newTheme;
    }

    private updateThemeClass(theme: string)
    {
        this.removeAllThemeClasses();
        this.addThemeClass(theme);
    }

    private removeAllThemeClasses()
    {
        for (let x in ThemeConstants)
            this.removeThemeClass(ThemeConstants[x as keyof typeof ThemeConstants]);
    }

    private removeThemeClass(theme: string)
    {
        this.renderer.selectRootElement('html', true).classList.remove(theme);
    }

    private addThemeClass(theme: string)
    {
        this.renderer.selectRootElement('html', true).classList.add(theme);
    }

    public onThemeChange()
    {
        return this.currentTheme;
    }

    public setSystemTheme()
    {
        this.removeSystemListeners();
        this.addWindowListeners();

        return this.setPreferredTheme();
    }

    private setPreferredTheme()
    {
        if (this.window.nativeWindow.matchMedia('(prefers-color-scheme: dark)').matches)
        {
            this.updateThemeClass(ThemeConstants.DarkTheme);
            return ThemeConstants.DarkTheme;
        }

        if (this.window.nativeWindow.matchMedia('(prefers-color-scheme: light)').matches)
        {
            this.updateThemeClass(ThemeConstants.LightTheme);
            return ThemeConstants.LightTheme;
        }

        return ThemeConstants.SystemTheme;
    }

    private addWindowListeners()
    {
        this.darkListener = this.window.nativeWindow.matchMedia('(prefers-color-scheme: dark)');
        this.darkListener.addEventListener('change', this.mediaDark);

        this.lightListener = this.window.nativeWindow.matchMedia('(prefers-color-scheme: light)')
        this.lightListener.addEventListener('change', this.mediaLight);
    }

    private mediaDark(mediaQuery: any)
    {
        if (mediaQuery.matches)
            this.updateThemeClass(ThemeConstants.DarkTheme);
    }

    private mediaLight(mediaQuery: any)
    {
        if (mediaQuery.matches)
            this.updateThemeClass(ThemeConstants.LightTheme);
    }

    private removeSystemListeners()
    {
        if (this.darkListener)
            this.darkListener.removeEventListener('change', this.mediaDark);

        if (this.lightListener)
            this.lightListener.removeEventListener('change', this.mediaLight);
    }

    ngOnDestroy(): void
    {
        this.removeAllThemeClasses();
    }
}