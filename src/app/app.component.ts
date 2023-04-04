import { Component, Renderer2 } from '@angular/core';
import { ThemeRenderer } from './global-shared/services/theme/theme.renderer';
import { ThemeConstants } from './global-shared/constants/theme.constants';
import { WindowRefService } from './global-shared/services/window/WindowRefService.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'my-hub-web';

  constructor(themeRenderer: ThemeRenderer, renderer: Renderer2, window: WindowRefService)
  {
    themeRenderer.renderer = renderer;

    if (window.nativeWindow.matchMedia('(prefers-color-scheme: dark)').matches)
      themeRenderer.ChangeTheme(ThemeConstants.DarkTheme);


    window.nativeWindow.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) =>
      {
        themeRenderer.ChangeTheme(ThemeConstants.DarkTheme);
      });
  }
}