export * from './validated-input.component';
export * from './custom-validators.service';
export * from './password-validator.component';
export * from './event-type-select.component';

import { ValidatedInputComponent } from './validated-input.component';
import { PasswordValidatorComponent } from './password-validator.component';
import { EventTypeSelectComponent } from './event-type-select.component';

export const FORM_EXTENSION_DIRECTIVES = [
    ValidatedInputComponent,
    PasswordValidatorComponent,
    EventTypeSelectComponent
];
