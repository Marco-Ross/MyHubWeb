import { Component } from '@angular/core';
import { ThemeRenderer } from './global-shared/services/theme/theme.renderer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'my-hub-web';
  readonly ThemeKey = 'Theme';

  constructor(private themeRenderer: ThemeRenderer) { }

  themeLoading: boolean = false;

  ngOnInit()
  {
    this.SetTheme();

    this.themeRenderer.getIsThemeLoading().subscribe({
      next: (isThemeLoading) =>
      {
        this.themeLoading = isThemeLoading;
      }
    });
  }

  private SetTheme()
  {
    this.themeRenderer.SetCurrentTheme();
  }
}