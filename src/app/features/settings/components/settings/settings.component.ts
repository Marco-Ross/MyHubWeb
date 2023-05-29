import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoggedInCookie } from 'src/app/global-shared/services/cookies/logged-in.cookie';
import { ThemeRenderer } from 'src/app/global-shared/services/theme/theme.renderer';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent
{
  constructor(private formBuilder: FormBuilder, private themeRenderer: ThemeRenderer, private loggedInCookie: LoggedInCookie) { }

  //

  settingsFG!: FormGroup;
  active = 1;
  username = 'Unknown';
  email = 'Unknown';
  private loginCookie = this.loggedInCookie.GetLoggedInCookie();

  ngOnInit()
  {
    this.settingsFG = this.formBuilder.group({
      theme: ''
    });

    this.username = this.loginCookie.Username;
    this.email = this.loginCookie.Email;

    this.SetThemeData();

    this.settingsFG.get('theme')?.valueChanges.subscribe((theme) => this.OnThemeChange(theme));
  }

  //////

  onAccountUpdate(accountInfo: any)
  {
    this.username = accountInfo.username;
  }

  private SetThemeData()
  {
    this.themeRenderer.OnThemeChange().subscribe({
      next: (theme) =>
      {
        this.settingsFG.get('theme')?.setValue(theme, {
          emitEvent: false,
          emitModelToViewChange: true,
          emitViewToModelChange: true
        });
      }
    });
  }

  private OnThemeChange(theme: string)
  {
    this.themeRenderer.ChangeTheme(theme);
  }
}