export * from './validated-input.component';
export * from './custom-validators.service';
export * from './password-validator.component';

import { ValidatedInputComponent } from './validated-input.component';
import { PasswordValidatorComponent } from './password-validator.component';

export const FORM_EXTENSION_DIRECTIVES = [
    ValidatedInputComponent,
    PasswordValidatorComponent
]