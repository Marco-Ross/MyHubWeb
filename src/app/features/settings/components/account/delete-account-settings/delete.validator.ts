import { AbstractControl, ValidationErrors } from '@angular/forms';

export class DeleteAccountValidator
{
    static Matching(control: AbstractControl): ValidationErrors | null
    {
        return control?.value.toLocaleLowerCase() === "delete" ? null : { deleteNotMatching: true };
    }
}