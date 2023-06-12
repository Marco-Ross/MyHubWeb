import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteAccountValidator } from './delete.validator';

@Component({
  selector: 'account-settings',
  templateUrl: 'delete-account-settings.component.html'
})
export class DeleteAccountSettingsComponent
{
  constructor(private formBuilder: FormBuilder) { }

  //

  @Output() popupForm = new EventEmitter<FormGroup>;
  deleteAccountFG!: FormGroup;
  deletable: boolean = false;

  ngOnInit()
  {
    this.deleteAccountFG = this.formBuilder.group({
      delete: ['', [Validators.required, DeleteAccountValidator.Matching]]
    });

    this.popupForm.emit(this.deleteAccountFG);
  }

  //////
}