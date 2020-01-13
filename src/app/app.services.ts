import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json; charset=UTF-8',
      'Accept': 'text/markdown; charset=UTF-8'
    })
  };

@Injectable()
export class AppService {
    userUrl = 'https://api.github.com/users/';  //  User api


    constructor(private http: HttpClient) { }

    getUserData(username): Observable<[]> {
        return this.http.get<[]>(this.userUrl + username)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    getUserRepos(repoUrl): Observable<[]> {
        return this.http.get<[]>(repoUrl)
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    getReadmeUrl(repoUrl): Observable<[]> {
        return this.http.get<[]>(repoUrl + "/readme")
            .pipe(
                retry(1),
                catchError(this.handleError)
            );
    }

    getReadmeContent(readmeUrl): Observable<HttpResponse<Object>> {
        return this.http.get<HttpResponse<Object>>(readmeUrl, {observe: 'response'})
            .pipe(
                catchError(this.handleError)
            );
    }

    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }
}