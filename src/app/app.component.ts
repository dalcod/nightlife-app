import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LocalsService } from './locals.service';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    constructor(private localsService: LocalsService) {}
    public locals: any[];
    public i: number = 0;
    public httpErr: string;
    
    ngOnInit() {
        // this.localsService.getToken().then(res => console.log(JSON.parse(res._body)))
        // è necessario strutturare il codice in modo tale che il metodo ".getToken()" venga invocato una sola volta, preferibilmente nel momento in cui l'applicazione viene avviata.
        this.localsService.getToken().then(() => null,
                                           err => this.httpErr = err);
    }
}