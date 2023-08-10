import { AbstractControl, ValidationErrors } from '@angular/forms';

export class InputValidator
{
    static whiteSpace(control: AbstractControl): ValidationErrors | null
    {
        const input = control.value;

        if (!input)
            return null;

        return input.trim()?.length ? null : { whitespace: true };
    }
}