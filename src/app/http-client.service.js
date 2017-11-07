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
var http_1 = require("@angular/http");
var HttpClient = (function () {
    function HttpClient(http) {
        this.http = http;
    }
    HttpClient.prototype.createAuthHeader = function (headers) {
        var token = localStorage.getItem('token');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'JWT ' + token);
    };
    HttpClient.prototype.getAuth = function (url) {
        var headers = new http_1.Headers();
        this.createAuthHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    };
    HttpClient.prototype.postAuth = function (url, data) {
        var headers = new http_1.Headers();
        this.createAuthHeader(headers);
        return this.http.post(url, data, { headers: headers });
    };
    HttpClient.prototype.putAuth = function (url, data) {
        var headers = new http_1.Headers();
        this.createAuthHeader(headers);
        return this.http.put(url, data, { headers: headers });
    };
    HttpClient.prototype.deleteAuth = function (url, data) {
        var headers = new http_1.Headers();
        this.createAuthHeader(headers);
        if (data) {
            return this.http.post(url, data, {
                headers: headers
            });
        }
        else {
            return this.http.delete(url, {
                headers: headers
            });
        }
    };
    return HttpClient;
}());
HttpClient = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], HttpClient);
exports.HttpClient = HttpClient;
//# sourceMappingURL=http-client.service.js.map