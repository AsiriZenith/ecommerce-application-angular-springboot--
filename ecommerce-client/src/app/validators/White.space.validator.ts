import { FormControl, ValidationErrors } from "@angular/forms";

export class WhiteSpaceValidator {

    static notOnlyWhiteSpace(control: FormControl): ValidationErrors {

        // check if string only contains whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {

            // invalid, return error object
            return { 'notOnlyWhiteSpace': true }
        } else {
            return null;
        }
    }
}