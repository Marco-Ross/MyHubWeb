import { Component } from '@angular/core';
import { ThemeRenderer } from './global-shared/services/theme/theme.renderer';
import { ThemeService } from './global-shared/services/theme/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'my-hub-web';
  readonly ThemeKey = 'Theme';

  constructor(private themeRenderer: ThemeRenderer, private themeService: ThemeService) { }

  ngOnInit()
  {
    this.themeService.GetTheme().subscribe({
      next: (themeOptions) =>
      {
        this.themeRenderer.ChangeTheme(themeOptions.theme);
      }
    });
  }
}