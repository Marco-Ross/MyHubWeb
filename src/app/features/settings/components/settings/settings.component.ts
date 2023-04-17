import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ThemeRenderer } from 'src/app/global-shared/services/theme/theme.renderer';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent
{
  constructor(private formBuilder: FormBuilder, private themeRenderer: ThemeRenderer) { }

  //

  settingsFG!: FormGroup;
  active = 1;

  ngOnInit()
  {
    this.settingsFG = this.formBuilder.group({
      theme: ''
    });

    this.SetThemeData();

    this.settingsFG.get('theme')?.valueChanges.subscribe((theme) => this.OnThemeChange(theme));
  }

  //////

  private SetThemeData()
  {
    this.themeRenderer.OnThemeChange().subscribe({
      next: (theme) =>
      {
        this.settingsFG.get('theme')?.setValue(theme, { 
          emitEvent: false,
          emitModelToViewChange: true,
          emitViewToModelChange: true });
      }
    });
  }

  private OnThemeChange(theme: string)
  {
    this.themeRenderer.ChangeTheme(theme);
  }
}