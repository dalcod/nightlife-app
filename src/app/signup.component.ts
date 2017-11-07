import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from './user.service';

@Component ({
    templateUrl: './signup.component.html',
    styleUrls: ['./form.css']
})

export class SignupComponent {

    public authForm: FormGroup;

    constructor(private router: Router,
                 private formBuilder: FormBuilder,
                 private userService: UserService) {
        this.authForm = formBuilder.group({
            username:  ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10), Validators.pattern(/^[\w]+$/)])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])],
            confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])]
        });
        this.authForm.valueChanges
            .subscribe(data => this.onValueChanges(data));
    }

    public errMsg: string;
    public httpErr: string;
    public formErrors = {
        'username': '',
        'password': '',
        'confirmPassword': ''
    };
public validationMessages = {
    'username': {
        'required': 'Username is required.',
        'minlength': 'Username must be at least 3 characters long.',
        'maxlength': 'Username cannot be more than 10 characters',
        'pattern': 'Username can contain only letters, numbers or underscores'
    },
    'password': {
        'required': 'Password is required.',
        'minlength': 'Password must be at least 6 characters long.',
        'maxlength': 'Password cannot be more than 20 characters'
    },
    'confirmPassword': {
        'required': 'Password is required.',
        'minlength': 'Password must be at least 6 characters long.',
        'maxlength': 'Password cannot be more than 20 characters'
    }
};

public onValueChanges(data: any) {
    if (!this.authForm) { return; }
    const form = this.authForm;
    for (const field in this.formErrors) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[field];
            for (const key in control.errors) {
                this.formErrors[field] += messages[key] + ' ';
            }
        }
    }
}

public onSubmit(obj: any): void {
    let username: string = obj.username;
    let password: string = obj.password;
    let confirmPass: string = obj.confirmPassword;
    if (password !== confirmPass) {
        this.errMsg = 'Password doesn\'t match, cannot confirm password';
        return;
    }
    if (this.formErrors.username !== '' || this.formErrors.password !== '' || this.formErrors.confirmPassword !== '') {
        this.errMsg = 'Please correct reported errors before submitting.';
        return;
    } else {
        this.errMsg = '';
        localStorage.removeItem('username');
        this.userService.signup(username, password)
            .then(result => {
            if (result) {
                localStorage.setItem('username', username);
                this.router.navigate(['/home']);
            } else {
                this.errMsg = this.userService.errMsg;
            }
        },
                  err => {
            this.httpErr = err;
        });
    }
}
}