import { Component } from '@angular/core';
import { ThemeRenderer } from './global-shared/services/theme/theme.renderer';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'my-hub-web';
  readonly ThemeKey = 'Theme';

  constructor(private themeRenderer: ThemeRenderer, private cookieService: CookieService) { }

  ngOnInit()
  {
    this.SetTheme();
  }

  private SetTheme()
  {
    let loginDetails = JSON.parse(this.cookieService.get('X-Logged-In') || 'null');

    if (loginDetails?.IsLoggedIn)
      this.themeRenderer.LoadThemeAndChange();
    else
      this.themeRenderer.SetSystemTheme();
  }
}