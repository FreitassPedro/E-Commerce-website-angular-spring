import { FormControl, ValidationErrors } from '@angular/forms';

export class OwnValidators {
  static notOnlyWhitespace(control: FormControl): ValidationErrors | null {

    if ((control.value != null) && (control.value.trim().length < 2) ) {
      return { 'notOnlyWhitespace': true };
    }

    return null;
  }
}
