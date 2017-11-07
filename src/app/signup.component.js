"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var user_service_1 = require("./user.service");
var SignupComponent = (function () {
    function SignupComponent(router, formBuilder, userService) {
        var _this = this;
        this.router = router;
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.formErrors = {
            'username': '',
            'password': '',
            'confirmPassword': ''
        };
        this.validationMessages = {
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
        this.authForm = formBuilder.group({
            username: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(10), forms_1.Validators.pattern(/^[\w]+$/)])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.maxLength(20)])],
            confirmPassword: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(6), forms_1.Validators.maxLength(20)])]
        });
        this.authForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanges(data); });
    }
    SignupComponent.prototype.onValueChanges = function (data) {
        if (!this.authForm) {
            return;
        }
        var form = this.authForm;
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    SignupComponent.prototype.onSubmit = function (obj) {
        var _this = this;
        var username = obj.username;
        var password = obj.password;
        var confirmPass = obj.confirmPassword;
        if (password !== confirmPass) {
            this.errMsg = 'Password doesn\'t match, cannot confirm password';
            return;
        }
        if (this.formErrors.username !== '' || this.formErrors.password !== '' || this.formErrors.confirmPassword !== '') {
            this.errMsg = 'Please correct reported errors before submitting.';
            return;
        }
        else {
            this.errMsg = '';
            localStorage.removeItem('username');
            this.userService.signup(username, password)
                .then(function (result) {
                if (result) {
                    localStorage.setItem('username', username);
                    _this.router.navigate(['/home']);
                }
                else {
                    _this.errMsg = _this.userService.errMsg;
                }
            }, function (err) {
                _this.httpErr = err;
            });
        }
    };
    return SignupComponent;
}());
SignupComponent = __decorate([
    core_1.Component({
        templateUrl: './signup.component.html',
        styleUrls: ['./form.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        forms_1.FormBuilder,
        user_service_1.UserService])
], SignupComponent);
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map