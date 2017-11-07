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
var http_client_service_1 = require("./http-client.service");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
var LocalsService = (function () {
    function LocalsService(http, httpAuth) {
        this.http = http;
        this.httpAuth = httpAuth;
    }
    /* public getToken(): Promise<any> {
        return this.http.get('/auth-token')
        .toPromise()
        .then(res => res)
        .catch(err => console.log(err))
    } */
    LocalsService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof http_1.Response) {
            errMsg = error.status + ' - ' + error.statusText;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    };
    LocalsService.prototype.getToken = function () {
        return this.http.get('/auth-token')
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    LocalsService.prototype.getLocals = function (city) {
        return this.http.get('/locals/' + city)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LocalsService.prototype.getSelected = function () {
        var username = localStorage.getItem('username');
        return this.httpAuth.getAuth('/selected/' + username)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LocalsService.prototype.updateSelected = function (sel) {
        var newSel = sel;
        var username = localStorage.getItem('username');
        return this.httpAuth.putAuth('/selected/' + username, newSel)
            .toPromise()
            .then(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    LocalsService.prototype.deleteSelected = function (sel, localId) {
        sel.selections.forEach(function (selection, i) {
            if (selection.localId === localId) {
                sel.selections.splice(i, 1);
            }
        });
        sel.selections.filter(function (obj) { return obj !== undefined; });
        return sel;
    };
    LocalsService.prototype.addSelected = function (sel, localId) {
        sel.selections.push({ localId: localId });
        return sel;
    };
    LocalsService.prototype.setSelected = function (locals, selected) {
        // se l'array "selected" esiste, ovvero, se l'utente ha aggiunto uno o più locali alla sua lista, allora controlla se vi sono locali che siano già stati selezionati all'interno dell'array "locals".
        if (selected && selected.length >= 1) {
            for (var i = 0; i < selected.length; i++) {
                for (var j = 0; j < locals.length; j++) {
                    // se gli 'id' dei 2 documenti "selected" e "locals" combaciano
                    if (selected[i].localId === locals[j].id) {
                        // aumenta il documento relativo con una proprietà ".selected" con valore uguale a "1".
                        locals[j].selected = 1;
                    }
                    else {
                        // utilizzando questa condizione saremo in grado di 'saltare' l'oggetto attuale e procedere al successivo evitando che il loop sovrascriva la proprietà ".selected" con "0" quando questa ha come valore "1" .
                        if (locals[j].selected === 1) {
                            continue;
                        }
                        // se gli 'id' inseriti nei due array non combaciano e quindi l'utente non ha selezionato quel locale, aumentare l'oggetto relativo con una una proprietà ".selected" con valore uguale a "0".
                        locals[j].selected = 0;
                    }
                }
            }
        }
        else {
            // nel caso in cui l'utente non sia loggato oppure non siano stati inseriti dei locali nell'array "selected", aumenta tutti gli oggetti nell'array "locals" con una proprietà "selected" con valore uguale a "0".
            for (var i = 0; i < locals.length; i++) {
                locals[i].selected = 0;
            }
        }
        return locals;
    };
    return LocalsService;
}());
LocalsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, http_client_service_1.HttpClient])
], LocalsService);
exports.LocalsService = LocalsService;
//# sourceMappingURL=locals.service.js.map