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
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var locals_service_1 = require("./locals.service");
var user_service_1 = require("./user.service");
var LocalsListComponent = (function () {
    function LocalsListComponent(localsService, userService, fb, router) {
        this.localsService = localsService;
        this.userService = userService;
        this.fb = fb;
        this.router = router;
        this.createForm();
    }
    LocalsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.userService.isLoggedIn()) {
            this.localsService.getSelected()
                .then(function (res) {
                // "this.mySel" contiene il documento tipo "Selection" che contiene l'array dei locali selezionti da quel determinato utente.
                _this.mySel = res;
                // assegna a "this.selections" l'array contenente i locali selezionati. 
                _this.selections = _this.mySel.selections;
                // assegna a "lastSearch" l'ultima ricerca effettuata
                _this.lastSearch = localStorage.getItem('search');
                // utilizza l'ultima ricerca effetuata per ottenere la lista dei locali dal server proxy in modo tale che nel momento in cui effettueremo il login e saremo rediretti a questo componente esso visualizzi la lista aggiornata dei locali che avevamo lasciato.
                _this.localsService.getLocals(_this.lastSearch)
                    .then(function (res) {
                    var data = JSON.parse(res);
                    _this.locals = _this.localsService.setSelected(data.businesses, _this.selections);
                }, function (err) { return _this.httpErr = err; });
            }, function (err) { return _this.httpErr = err; });
        }
        else {
            this.selections = [];
        }
    };
    LocalsListComponent.prototype.createForm = function () {
        this.localsForm = this.fb.group({
            location: ''
        });
    };
    LocalsListComponent.prototype.onSubmit = function (data) {
        var _this = this;
        this.loading = true;
        this.locals = null;
        // ad ogni nuova ricerca rimuovi la ricerca precedente dal "localStorage".
        localStorage.removeItem('search');
        // ottieni il valore dell'elemento input "data.location" e assegnalo alla variabile "location".
        var location = data.location;
        // assegna alla proprietà ".search" la nuova ricerca effettuata.
        this.search = location;
        // ottieni la lista dei locali realivi alla città inserita o "location" dal metodo ".getLocals()"
        this.localsService.getLocals(location)
            .then(function (res) {
            var data = JSON.parse(res);
            // assegna alla proprietà "locals" un nuovo array contenente la lista dei locali aggiornata con una proprietà che indichi quelli selezionati dall'utente. L'array è ottenuto grazie al confronto con la lista dei locali ritornati dal proxy sever "data.businesses" e l'array dei locali selezionati "this.selections".
            _this.locals = _this.localsService.setSelected(data.businesses, _this.selections);
            _this.loading = false;
        }, function (err) { return _this.httpErr = err; });
    };
    // "trackBy" all'interno del template il quale è collegato a questo metodo ci consente di specificare al loop "*ngFor", di evitare di sostituire gli elementi con una serie di nuovi, nel caso questi siano identici, rendendo possibile così prestazioni maggiori.
    LocalsListComponent.prototype.trackByLocals = function (index, local) {
        return local.id;
    };
    LocalsListComponent.prototype.selected = function (local) {
        var _this = this;
        // se l'utente non è loggato
        if (!this.userService.isLoggedIn()) {
            // nel caso prema uno dei bottoni "going" salva la ricerca corrente nel "localStorage"
            localStorage.setItem('search', this.search);
            // e redirigi alla pagina di login
            this.router.navigate(['/login']);
        }
        else {
            // se l'utente è loggato e il locale non è contrassegnato come "selected"
            if (local.selected !== 1) {
                // imposta il valore della proprietà "selected" su "1"
                local.selected = 1;
                // aggiungi il locale alla lista dei locali selezionati grazie all'utilizzo del metodo ".addSelected()". "this.mySel" è l'array che contiene, se presenti, i locali selezionati da quel particolare utente, "local.id" invece è l'id unico relativo a quel determinato locale.
                this.mySel = this.localsService.addSelected(this.mySel, local.id);
                // aggiorna la lista dei locali selezionati salvando le modiche nel database.
                this.localsService.updateSelected(this.mySel)
                    .then(function () { return null; }, function (err) { return _this.httpErr = err; });
            }
            else {
                // nel caso in cui l'utente sia loggato e il locale sia già selezionato
                // imposta il valore della proprietà ".selected" su "0"
                local.selected = 0;
                // rimuovi il locale dalla lista dei locali selezionti
                this.mySel = this.localsService.deleteSelected(this.mySel, local.id);
                // aggiorna la lista dei locali selezionati.
                this.localsService.updateSelected(this.mySel)
                    .then(function () { return null; }, function (err) { return _this.httpErr = err; });
            }
        }
    };
    return LocalsListComponent;
}());
LocalsListComponent = __decorate([
    core_1.Component({
        selector: 'list',
        templateUrl: './locals-list.component.html',
        styleUrls: ['./locals-list.component.css']
    }),
    __metadata("design:paramtypes", [locals_service_1.LocalsService,
        user_service_1.UserService,
        forms_1.FormBuilder,
        router_1.Router])
], LocalsListComponent);
exports.LocalsListComponent = LocalsListComponent;
//# sourceMappingURL=locals-list.component.js.map