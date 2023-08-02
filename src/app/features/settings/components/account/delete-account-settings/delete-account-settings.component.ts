import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteAccountValidator } from './delete.validator';
import { NavLayoutService } from 'src/app/features/nav-bar/nav-layout.service';

@Component({
  selector: 'account-settings',
  templateUrl: 'delete-account-settings.component.html'
})
export class DeleteAccountSettingsComponent
{
  constructor(private formBuilder: FormBuilder, private navLayoutService: NavLayoutService) { }

  //

  deleteAccountFG!: FormGroup;
  deleteSubmitted: boolean = false;

  ngOnInit()
  {
    this.deleteAccountFG = this.formBuilder.group({
      delete: ['', [Validators.required, DeleteAccountValidator.Matching]]
    });
  }

  //////

  onClose = () =>
  {
    return new Promise((resolve, reject) =>
    {
      this.deleteSubmitted = true;

      if (!this.deleteAccountFG.valid)
        return reject();

      this.navLayoutService.signOut();
      resolve(undefined);
    });
  }
}