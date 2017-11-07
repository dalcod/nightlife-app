import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import {Observable} from 'rxjs/Observable';

@Injectable()
export class HttpClient {
    constructor(private http: Http) {}

    createAuthHeader(headers: Headers) {
        let token: string = localStorage.getItem('token');
        headers.append('Content-Type', 'application/json')
        headers.append('Authorization', 'JWT ' + token);
    }

    getAuth(url: string): Observable<any> {
        let headers = new Headers();
        this.createAuthHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    postAuth(url: string, data: any): Observable<any> {
        let headers = new Headers();
        this.createAuthHeader(headers);
        return this.http.post(url, data, {headers: headers});
    }

    putAuth(url: string, data: any): Observable<any> {
        let headers = new Headers();
        this.createAuthHeader(headers);
        return this.http.put(url, data, {headers: headers});
    }

    deleteAuth(url: string, data?: any): Observable<any> {
        let headers = new Headers();
        this.createAuthHeader(headers);
        if (data) {
            return this.http.post(url, data, {
                headers: headers
            });
        } else {
            return this.http.delete(url, {
                headers: headers
            });
        }
    }
}