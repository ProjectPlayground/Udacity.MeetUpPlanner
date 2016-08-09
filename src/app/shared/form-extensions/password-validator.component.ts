import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'password-validator',
  templateUrl: 'password-validator.component.html'
})
export class PasswordValidatorComponent {

  @Input() control: FormControl = new FormControl();

}
