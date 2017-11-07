import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutingModule } from './routing.module';

import { LocalsService } from './locals.service';
import { UserService } from './user.service';
import { LoggedInGuard } from './logged-in-guard';
import { HttpClient } from './http-client.service';

import { AppComponent } from './app.component';
import { LocalsListComponent } from './locals-list.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { ErrorComponent } from './error.component';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpModule,
        RoutingModule
    ],
    declarations: [
        AppComponent,
        LocalsListComponent,
        LoginComponent,
        SignupComponent,
        ErrorComponent
    ],
    providers: [ LocalsService, UserService, LoggedInGuard, HttpClient ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }