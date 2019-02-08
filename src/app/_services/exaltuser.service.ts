import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Exaltuser } from '../_models/exaltuser';
import { HttpClient, } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ExaltuserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Exaltuser[]> {
    return this.http.get<Exaltuser[]>(this.baseUrl + 'users');
  }

  getUser( id ): Observable<Exaltuser> {
    return this.http.get<Exaltuser>(this.baseUrl + 'users/' + id);
  }
}
