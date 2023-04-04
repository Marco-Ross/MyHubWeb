import { Injectable, Renderer2 } from '@angular/core';
import { ThemeConstants } from '../../constants/theme.constants';

@Injectable()
export class ThemeRenderer
{
    renderer!: Renderer2;
    private currentTheme: string = ThemeConstants.LightTheme;

    public ChangeTheme(theme: string)
    {
        let newTheme = Object.values(ThemeConstants).find(x => x == theme) ?? '';

        if (newTheme == '')
            this.UpdateThemeClass(ThemeConstants.LightTheme);
        else
            this.UpdateThemeClass(newTheme);
    }

    private UpdateThemeClass(theme: string)
    {
        this.renderer.removeClass(document.body, this.currentTheme);
        this.renderer.addClass(document.body, theme);
        this.currentTheme = theme;
    }

    ngOnDestroy(): void
    {
        this.renderer.removeClass(document.body, this.currentTheme);
    }
}