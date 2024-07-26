import { FormControl, ValidationErrors } from '@angular/forms';

export class OwnValidators {
  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {

    if (typeof control.value === 'string' && control.value.trim().length < 2) {
      return { 'notOnlyWhitespace': true };
    }

    return null;
  }
}
