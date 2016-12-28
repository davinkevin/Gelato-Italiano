import {AbstractControl} from '@angular/forms';

export const emailMatcher = (control: AbstractControl): {[key: string]: boolean} => {

    const email = control.get('email');
    const valid = control.get('valid');


    if (!email || !valid) {
        return null;
    }

    return email.value === valid.value ? null : { nomatch: true };
};
