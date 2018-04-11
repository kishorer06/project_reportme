import { Component, OnInit } from '@angular/core';
import { UserService } from "app/services/user/user.service";
import { Router } from "@angular/router";
import { User } from "app/model/user";
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, ErrorStateMatcher } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide = true;
  user: User = new User();
  errorMessage: string;
  userRegistrationForm: FormGroup;
  errors = errorMessages;
  constructor(public userService: UserService, private formBuilder: FormBuilder, public router: Router) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.userRegistrationForm = this.formBuilder.group({
      fullName: ['', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(128)
      ]],
      emailGroup: this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]],
        confirmEmail: ['', Validators.required]
      }, { validator: CustomValidators.childrenEqual }),
      passwordGroup: this.formBuilder.group({
        password: ['', [
          Validators.required,
          Validators.pattern(regExps.password)
        ]],
        confirmPassword: ['', Validators.required]
      }, { validator: CustomValidators.childrenEqual })
    });
  }

  register() {
    this.user.role = "USER";
    this.userService.createAccount(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    }, err => {
      let error = JSON.parse(err._body);
      console.log(error.errorMessage);
      this.errorMessage = error.errorMessage;
    }
    )
  }
}

/**
 * Custom validator functions for reactive form validation
 */
export class CustomValidators {
  /**
   * Validates that child controls in the form group are equal
   */
  static childrenEqual: ValidatorFn = (formGroup: FormGroup) => {
    const [firstControlName, ...otherControlNames] = Object.keys(formGroup.controls || {});
    const isValid = otherControlNames.every(controlName => formGroup.get(controlName).value === formGroup.get(firstControlName).value);
    return isValid ? null : { childrenNotEqual: true };
  }
}

/**
 * Custom ErrorStateMatcher which returns true (error exists) when the parent form group is invalid and the control has been touched
 */
export class ConfirmValidParentMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.parent.invalid && control.touched;
  }
}

/**
 * Collection of reusable RegExps
 */
export const regExps: { [key: string]: RegExp } = {
  password: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
};

/**
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  fullName: 'Full name must be between 1 and 128 characters',
  email: 'Email must be a valid email address (username@domain)',
  confirmEmail: 'Email addresses must match',
  password: 'Password must be between 7 and 15 characters, and contain at least one number and special character',
  confirmPassword: 'Passwords must match'
};
