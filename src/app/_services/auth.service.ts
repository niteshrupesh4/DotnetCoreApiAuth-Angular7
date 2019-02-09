import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Exaltuser } from '../_models/exaltuser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  // baseUrl = 'https://localhost:5001/api/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: Exaltuser;
  photUrl = new BehaviorSubject<string>('../../assets/user.png.png');
  currentPhotoUrl = this.photUrl.asObservable();

constructor(private _http: HttpClient) { }

  changeMemberPhoto(photUrl: string) {
    this.photUrl.next(photUrl);
  }

  login(model: any) {
    return this._http.post(this.baseUrl + 'login', model)
            .pipe(
              map((responce: any) => {
                const user = responce;
                if (user) {
                  localStorage.setItem('token', user.token);
                  localStorage.setItem('user', JSON.stringify(user.user));
                  this.decodedToken = this.jwtHelper.decodeToken(user.token);
                  this.currentUser = user.user;
                  this.changeMemberPhoto(this.currentUser.photoUrl);
                }
              })
            );
  }

  register(model: any) {
    return this._http.post(this.baseUrl + 'register', model);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
