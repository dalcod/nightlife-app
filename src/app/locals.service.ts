import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

import { Selected } from './selected';

import { HttpClient } from './http-client.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LocalsService {
    constructor (private http: Http, private httpAuth: HttpClient) {}

    public errMsg: string;
    
    /* public getToken(): Promise<any> {
        return this.http.get('/auth-token')
        .toPromise()
        .then(res => res)
        .catch(err => console.log(err))
    } */
    
    public handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = error.status + ' - ' + error.statusText;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }

    public getToken(): Promise<any> {
        return this.http.get('/auth-token')
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    public getLocals(city: string): Promise<any> {
        return this.http.get('/locals/' + city)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    public getSelected(): Promise<Selected> {
        const username = localStorage.getItem('username');
        return this.httpAuth.getAuth('/selected/' + username)
            .toPromise()
            .then(res => res.json() as Selected)
            .catch(this.handleError);
    }

    public updateSelected(sel: Selected): Promise<any> {
        const newSel = sel;
        const username = localStorage.getItem('username');
        return this.httpAuth.putAuth('/selected/' + username, newSel)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
    }

    public deleteSelected(sel: Selected, localId: string): Selected {
        sel.selections.forEach((selection, i) => {
            if (selection.localId === localId) {
                sel.selections.splice(i, 1);
            }
        });
        sel.selections.filter(obj => obj !== undefined);
        return sel;
    }

    public addSelected(sel: Selected, localId: string): Selected {
        sel.selections.push({localId: localId});
        return sel;
    }

    public setSelected(locals: any[], selected: any[]): any[] {
        // se l'array "selected" esiste, ovvero, se l'utente ha aggiunto uno o più locali alla sua lista, allora controlla se vi sono locali che siano già stati selezionati all'interno dell'array "locals".
        if (selected && selected.length >= 1) {
            for (let i = 0;  i < selected.length; i++) {
                for (let j = 0; j < locals.length; j++) {
                    // se gli 'id' dei 2 documenti "selected" e "locals" combaciano
                    if (selected[i].localId === locals[j].id) {
                        // aumenta il documento relativo con una proprietà ".selected" con valore uguale a "1".
                        locals[j].selected = 1;
                    } else {
                        // utilizzando questa condizione saremo in grado di 'saltare' l'oggetto attuale e procedere al successivo evitando che il loop sovrascriva la proprietà ".selected" con "0" quando questa ha come valore "1" .
                        if (locals[j].selected === 1) {
                            continue;
                        }
                        // se gli 'id' inseriti nei due array non combaciano e quindi l'utente non ha selezionato quel locale, aumentare l'oggetto relativo con una una proprietà ".selected" con valore uguale a "0".
                        locals[j].selected = 0;
                    }
                }
            }
        } else {
            // nel caso in cui l'utente non sia loggato oppure non siano stati inseriti dei locali nell'array "selected", aumenta tutti gli oggetti nell'array "locals" con una proprietà "selected" con valore uguale a "0".
            for (let i = 0; i < locals.length; i++) {
                locals[i].selected = 0;
            }
        }
        return locals;
    }
}