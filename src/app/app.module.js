"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var routing_module_1 = require("./routing.module");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var locals_service_1 = require("./locals.service");
var user_service_1 = require("./user.service");
var logged_in_guard_1 = require("./logged-in-guard");
var http_client_service_1 = require("./http-client.service");
var app_component_1 = require("./app.component");
var locals_list_component_1 = require("./locals-list.component");
var login_component_1 = require("./login.component");
var signup_component_1 = require("./signup.component");
var error_component_1 = require("./error.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            routing_module_1.RoutingModule,
            ng_bootstrap_1.NgbModule.forRoot()
        ],
        declarations: [
            app_component_1.AppComponent,
            locals_list_component_1.LocalsListComponent,
            login_component_1.LoginComponent,
            signup_component_1.SignupComponent,
            error_component_1.ErrorComponent
        ],
        providers: [locals_service_1.LocalsService, user_service_1.UserService, logged_in_guard_1.LoggedInGuard, http_client_service_1.HttpClient],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map