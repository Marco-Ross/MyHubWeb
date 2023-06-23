import { Component } from '@angular/core';
import { ThemeRenderer } from './global-shared/services/theme/theme.renderer';
import { LoggedInCookie } from './global-shared/services/cookies/logged-in.cookie';
import { WindowRefService } from './global-shared/services/window/window-ref.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'my-hub-web';
  readonly ThemeKey = 'Theme';

  constructor(private themeRenderer: ThemeRenderer, private loggedInCookie: LoggedInCookie, private windowRefService: WindowRefService) { }

  themeLoading: boolean = false;

  ngOnInit()
  {
    this.windowRefService.nativeWindow.document.documentElement.style.cssText = '';

    this.SetTheme();

    this.themeRenderer.getIsThemeLoading().subscribe({
      next: (isThemeLoading: any) =>
      {
        this.themeLoading = isThemeLoading;
      }
    });
  }

  private SetTheme()
  {
    let loginDetails = this.loggedInCookie.GetLoggedInCookie();

    if (loginDetails?.IsLoggedIn)
      this.themeRenderer.SetCurrentTheme();
  }
}