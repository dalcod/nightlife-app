import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoggedInGuard } from './logged-in-guard';

import { LocalsListComponent } from './locals-list.component';
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { ErrorComponent } from './error.component';

const routes: Routes = [
    { path: 'home', component: LocalsListComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class RoutingModule {}