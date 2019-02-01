import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://localhost:5001/api/auth/';

constructor(private _http: HttpClient) { }

  login(model: any) {
    return this._http.post(this.baseUrl + 'login', model)
            .pipe(
              map((responce: any) => {
                const user = responce;
                if (user) {
                  localStorage.setItem('token', user.token);
                }
              })
            );
  }

  register(model: any) {
    return this._http.post(this.baseUrl + 'register', model);
  }

}
