import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../model/user";
import { Router } from "@angular/router";
import { AuthService } from "app/services/authorization/auth.service";
import { FormControl, FormBuilder, FormGroup, Validators, ValidatorFn, FormGroupDirective, NgForm } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, ErrorStateMatcher } from '@angular/material';



@Component({
  selector: 'app-login',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']

})
export class SignInComponent implements OnInit {
  hide = true;
  user: User = new User();
  errorMessage: string;
  userSignInForm: FormGroup;
  errors = errorMessages;
  constructor(private router: Router, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService) {
    this.createForm();
  }

  ngOnInit() {
  }
  createForm() {
    this.userSignInForm = this.formBuilder.group({
      emailGroup: this.formBuilder.group({
        email: ['', [
          Validators.required,
          Validators.email
        ]]
      }), passwordGroup: this.formBuilder.group({
        password: ['', [
          Validators.required
        ]]
      })
    });
  }

  login() {
    this.authService.logIn(this.user)
      .subscribe(data => {
        let snackBarRef = this.snackBar.open('Successfully authenticated!', this.user.username, {
          duration: 2000,
        });
        this.router.navigate(['/welcome']);
      }, err => {
        this.snackBar.open("Incorrect", "Email or Password", {
          duration: 2000,
        });
        // this.errorMessage="Email or Password is incorrect";
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
 * Collection of reusable error messages
 */
export const errorMessages: { [key: string]: string } = {
  email: 'Email must be a valid email address (username@domain)',
};
