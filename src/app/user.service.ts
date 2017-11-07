import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
    private loggedIn = false;
    public errMsg: string = '';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor (private http: Http) {
        this.loggedIn = !!localStorage.getItem('token');
    }
    
    public handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            errMsg = error.status + ' - ' + error.statusText;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        return Promise.reject(errMsg);
    }

    public signup(username: string, password: string): Promise<any> {
        return this.http.post('/signup', JSON.stringify({username, password}), {headers: this.headers})
            .toPromise()
                .then(res => {
                let resObj = res.json();
                if (resObj.success) {
                    localStorage.setItem('token', resObj.token);
                    this.loggedIn = true;
                    return resObj.success;
                } else {
                    this.errMsg = resObj.message;
                    return false;
                }
            }).catch(this.handleError);
    };

    public login(username: string, password: string): Promise<any> {
        return this.http.post('/login', JSON.stringify({username, password}), {headers: this.headers})
            .toPromise()
                .then(res => {
                let resObj = res.json();
                if (resObj.success) {
                    localStorage.setItem('token', resObj.token);
                    this.loggedIn = true;
                    return resObj.success;
                } else {
                    this.errMsg = resObj.error;
                    return false;
                }
            }).catch(this.handleError);
    };

    public logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        this.loggedIn = false;
    };

    public isLoggedIn(): boolean {
        return this.loggedIn;
    };
};