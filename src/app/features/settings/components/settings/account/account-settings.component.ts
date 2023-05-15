import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'account-settings',
  templateUrl: 'account-settings.component.html'
})
export class AccountSettingsComponent
{
  constructor(private formBuilder: FormBuilder) { }

  //

  settingsFG!: FormGroup;
  active = 1;

  ngOnInit()
  {
    this.settingsFG = this.formBuilder.group({
      theme: ''
    });
  }

  //////


}