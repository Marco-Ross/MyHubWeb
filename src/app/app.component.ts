import { Component } from '@angular/core';
import { ThemeRenderer } from './global-shared/services/theme/theme.renderer';
import { LoggedInCookie } from './global-shared/services/cookies/logged-in.cookie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'my-hub-web';
  readonly ThemeKey = 'Theme';

  constructor(private themeRenderer: ThemeRenderer, private loggedInCookie: LoggedInCookie) { }

  themeLoading: boolean = false;

  ngOnInit()
  {
    this.setTheme();

    this.themeRenderer.getIsThemeLoading().subscribe({
      next: (isThemeLoading: any) =>
      {
        this.themeLoading = isThemeLoading;
      }
    });
  }

  private setTheme()
  {
    let loginDetails = this.loggedInCookie.GetLoggedInCookie();

    if (loginDetails?.IsLoggedIn)
      this.themeRenderer.setCurrentTheme();
    else
      this.themeRenderer.setLoggedOutTheme();
  }
}