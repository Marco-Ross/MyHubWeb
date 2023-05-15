import { Injectable, Renderer2 } from '@angular/core';
import { ThemeConstants } from '../../constants/theme.constants';
import { WindowRefService } from '../window/WindowRefService.model';
import { BehaviorSubject } from 'rxjs';
import { ThemeStorageService } from './theme-storage.service';
import { ThemeService } from './theme.service';

@Injectable()
export class ThemeRenderer
{
    currentTheme = new BehaviorSubject('');
    renderer!: Renderer2;

    darkListener: any;
    lightListener: any;

    constructor(private window: WindowRefService, private themeStorage: ThemeStorageService, private themeService: ThemeService)
    {
        this.MediaDark = this.MediaDark.bind(this);
        this.MediaLight = this.MediaLight.bind(this);
    }

    public SetCurrentTheme()
    {
        this.themeService.GetTheme().subscribe({
            next: (themeOptions) =>
            {
                let setTheme = this.UpdateTheme(themeOptions.theme);
                this.themeStorage.UpdateTheme(setTheme);
                this.currentTheme.next(themeOptions.theme);
            }
        });
    }

    public ChangeTheme(theme: string)
    {
        let setTheme = this.UpdateTheme(theme);       
        this.themeService.UpdateTheme(theme).subscribe();
        this.themeStorage.UpdateTheme(setTheme);
        this.currentTheme.next(theme);
    }

    private UpdateTheme(theme: string | null)
    {
        let newTheme = Object.values(ThemeConstants).find(x => x == theme) ?? ThemeConstants.SystemTheme;

        if (newTheme == ThemeConstants.SystemTheme)
            return this.SetSystemTheme();
        else
        {
            this.RemoveSystemListeners();
            this.UpdateThemeClass(newTheme);
        }

        return newTheme;
    }

    private UpdateThemeClass(theme: string)
    {
        this.RemoveAllThemeClasses();
        this.AddThemeClass(theme);
    }

    private RemoveAllThemeClasses()
    {
        for (let x in ThemeConstants)
            this.RemoveThemeClass(ThemeConstants[x as keyof typeof ThemeConstants]);
    }

    private RemoveThemeClass(theme: string)
    {
        this.renderer.selectRootElement('html', true).classList.remove(theme);
    }

    private AddThemeClass(theme: string)
    {
        this.renderer.selectRootElement('html', true).classList.add(theme);
    }

    public OnThemeChange()
    {
        return this.currentTheme;
    }

    public SetSystemTheme()
    {
        this.RemoveSystemListeners();
        this.AddWindowListeners();

        return this.SetPreferredTheme();
    }

    private SetPreferredTheme()
    {
        if (this.window.nativeWindow.matchMedia('(prefers-color-scheme: dark)').matches)
        {
            this.UpdateThemeClass(ThemeConstants.DarkTheme);
            return ThemeConstants.DarkTheme;
        }

        if (this.window.nativeWindow.matchMedia('(prefers-color-scheme: light)').matches)
        {
            this.UpdateThemeClass(ThemeConstants.LightTheme);
            return ThemeConstants.LightTheme;
        }

        return ThemeConstants.SystemTheme;
    }

    private AddWindowListeners()
    {
        this.darkListener = this.window.nativeWindow.matchMedia('(prefers-color-scheme: dark)');
        this.darkListener.addEventListener('change', this.MediaDark);

        this.lightListener = this.window.nativeWindow.matchMedia('(prefers-color-scheme: light)')
        this.lightListener.addEventListener('change', this.MediaLight);
    }

    private MediaDark(mediaQuery: any)
    {
        if (mediaQuery.matches)
            this.UpdateThemeClass(ThemeConstants.DarkTheme);
    }

    private MediaLight(mediaQuery: any)
    {
        if (mediaQuery.matches)
            this.UpdateThemeClass(ThemeConstants.LightTheme);
    }

    private RemoveSystemListeners()
    {
        if (this.darkListener)
            this.darkListener.removeEventListener('change', this.MediaDark);

        if (this.lightListener)
            this.lightListener.removeEventListener('change', this.MediaLight);
    }

    ngOnDestroy(): void
    {
        this.RemoveAllThemeClasses();
    }
}