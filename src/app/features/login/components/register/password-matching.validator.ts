import { AbstractControl, ValidationErrors } from '@angular/forms';

export class PasswordValidator
{
    static Matching(control: AbstractControl): ValidationErrors | null
    {
        const password = control.get('password');
        const confirmPassword = control.get('confirmPassword');

        return password?.value === confirmPassword?.value ? null : { invalidMatchingPassword: true };
    }

    static Strength(control: AbstractControl): ValidationErrors | null
    {
        const password = control.value;

        if (!password)
            return null;

        const hasUpperCase = /[A-Z]+/.test(password);
        const hasLowerCase = /[a-z]+/.test(password);
        const hasNumber = /[0-9]+/.test(password);
        const hasSpecial = /[!@#$%^&*]+/.test(password);

        const isPasswordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecial;

        return isPasswordValid ? null : { upperCase: !hasUpperCase, lowerCase: !hasLowerCase, number: !hasNumber, special: !hasSpecial };
    }
}