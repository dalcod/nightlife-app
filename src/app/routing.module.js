"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var locals_list_component_1 = require("./locals-list.component");
var signup_component_1 = require("./signup.component");
var login_component_1 = require("./login.component");
var error_component_1 = require("./error.component");
var routes = [
    { path: 'home', component: locals_list_component_1.LocalsListComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'signup', component: signup_component_1.SignupComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '**', component: error_component_1.ErrorComponent }
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    return RoutingModule;
}());
RoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], RoutingModule);
exports.RoutingModule = RoutingModule;
//# sourceMappingURL=routing.module.js.map