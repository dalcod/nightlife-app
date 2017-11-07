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
var LoginComponent = (function () {
    function LoginComponent(router, formBuilder, userService) {
        var _this = this;
        this.router = router;
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.formErrors = {
            'username': '',
            'password': ''
        };
        this.validationMessages = {
            'username': {
                'required': 'Username is required.',
                'minlength': 'Username doesn\'t exist.',
                'maxlength': 'Username doesn\'t exist.',
                'pattern': 'Username doesn\'t exist.'
            },
            'password': {
                'required': 'Password is required.',
            }
        };
        this.authForm = formBuilder.group({
            username: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(10), forms_1.Validators.pattern(/^[\w]+$/)])],
            password: ['', forms_1.Validators.required]
        });
        this.authForm.valueChanges
            .subscribe(function (data) { return _this.onValueChanges(data); });
    }
    LoginComponent.prototype.onValueChanges = function (data) {
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
    LoginComponent.prototype.onSubmit = function (obj) {
        var _this = this;
        var username = obj.username;
        var password = obj.password;
        if (this.formErrors.username !== '' || this.formErrors.password !== '') {
            this.errMsg = 'Please correct reported errors before submitting.';
            return;
        }
        else {
            this.errMsg = '';
            localStorage.setItem('username', username);
            this.userService.login(username, password)
                .then(function (result) {
                if (result) {
                    _this.errMsg = '';
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
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        templateUrl: './login.component.html',
        styleUrls: ['./form.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        forms_1.FormBuilder,
        user_service_1.UserService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map