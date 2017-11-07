import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

import { LocalsService } from './locals.service';
import { UserService } from './user.service';

import { Selected } from './selected';

@Component({
    selector: 'list',
    templateUrl: './locals-list.component.html',
    styleUrls: ['./locals-list.component.css']
})

export class LocalsListComponent implements OnInit {
    constructor(private localsService: LocalsService,
                 private userService: UserService,
                 private fb: FormBuilder,
                 private router: Router) {
        this.createForm();
    }

    public locals: any[];
    public localsForm: FormGroup;
    public mySel: Selected;
    public selections: any[];
    public search: string;
    public lastSearch: string;
    public httpErr: string;
    public loading: boolean;

    ngOnInit() {
        if (this.userService.isLoggedIn()) {
            this.localsService.getSelected()
                .then(res => {
                // "this.mySel" contiene il documento tipo "Selection" che contiene l'array dei locali selezionti da quel determinato utente.
                this.mySel = res;
                // assegna a "this.selections" l'array contenente i locali selezionati. 
                this.selections = this.mySel.selections;
                // assegna a "lastSearch" l'ultima ricerca effettuata
                this.lastSearch = localStorage.getItem('search');
                // utilizza l'ultima ricerca effetuata per ottenere la lista dei locali dal server proxy in modo tale che nel momento in cui effettueremo il login e saremo rediretti a questo componente esso visualizzi la lista aggiornata dei locali che avevamo lasciato.
                this.localsService.getLocals(this.lastSearch)
                    .then(res => {
                    const data = JSON.parse(res);
                    this.locals = this.localsService.setSelected(data.businesses, this.selections);
                },
                         err => this.httpErr = err);
            },
                      err => this.httpErr = err)
        } else {
            this.selections = [];
        }
    }

    private createForm() {
        this.localsForm = this.fb.group({
            location: ''
        });
    }

    public onSubmit(data: any) {
        this.loading = true;
        this.locals = null;
        // ad ogni nuova ricerca rimuovi la ricerca precedente dal "localStorage".
        localStorage.removeItem('search');
        // ottieni il valore dell'elemento input "data.location" e assegnalo alla variabile "location".
        let location = data.location;
        // assegna alla proprietà ".search" la nuova ricerca effettuata.
        this.search = location;
        // ottieni la lista dei locali realivi alla città inserita o "location" dal metodo ".getLocals()"
        this.localsService.getLocals(location)
            .then(res => {
            let data = JSON.parse(res);
            // assegna alla proprietà "locals" un nuovo array contenente la lista dei locali aggiornata con una proprietà che indichi quelli selezionati dall'utente. L'array è ottenuto grazie al confronto con la lista dei locali ritornati dal proxy sever "data.businesses" e l'array dei locali selezionati "this.selections".
            this.locals = this.localsService.setSelected(data.businesses, this.selections);
            this.loading = false;
        },
                 err => this.httpErr = err);
    }
    
    // "trackBy" all'interno del template il quale è collegato a questo metodo ci consente di specificare al loop "*ngFor", di evitare di sostituire gli elementi con una serie di nuovi, nel caso questi siano identici, rendendo possibile così prestazioni maggiori.
    public trackByLocals(index: number, local: any) {
        return local.id;
    }

    public selected(local: any) {
        // se l'utente non è loggato
        if (!this.userService.isLoggedIn()) {
            // nel caso prema uno dei bottoni "going" salva la ricerca corrente nel "localStorage"
            localStorage.setItem('search', this.search);
            // e redirigi alla pagina di login
            this.router.navigate(['/login']);
        } else {
            // se l'utente è loggato e il locale non è contrassegnato come "selected"
            if (local.selected !== 1) {
                // imposta il valore della proprietà "selected" su "1"
                local.selected = 1;
                // aggiungi il locale alla lista dei locali selezionati grazie all'utilizzo del metodo ".addSelected()". "this.mySel" è l'array che contiene, se presenti, i locali selezionati da quel particolare utente, "local.id" invece è l'id unico relativo a quel determinato locale.
                this.mySel = this.localsService.addSelected(this.mySel, local.id);
                // aggiorna la lista dei locali selezionati salvando le modiche nel database.
                this.localsService.updateSelected(this.mySel)
                    .then(() => null,
                          err => this.httpErr = err);
            } else {
                // nel caso in cui l'utente sia loggato e il locale sia già selezionato
                // imposta il valore della proprietà ".selected" su "0"
                local.selected = 0;
                // rimuovi il locale dalla lista dei locali selezionti
                this.mySel = this.localsService.deleteSelected(this.mySel, local.id);
                // aggiorna la lista dei locali selezionati.
                this.localsService.updateSelected(this.mySel)
                .then(() => null,
                      err => this.httpErr = err);
            }
        }
    }

}