import { HttpResultModel } from './../interfaces/httpResult.Model';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';

// import { User } from './../interfaces/user.model';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  check(): boolean {
    return localStorage.getItem('profile') ? true : false;
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.api_url}/auth/login`, credentials)
      .do(data => {
        // console.log('retorno:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('profile', btoa(JSON.stringify(data.profile)));
      });
  }

  logout(): void {
    this.http.get(`${environment.api_url}/auth/logout`).subscribe(resp => {
      // console.log(resp);
      localStorage.clear();
      this.router.navigate(['auth/login']);
    });
  }

  getProfile(): HttpResultModel {
    if (this.setProfile()) {
      return localStorage.getItem('profile') ? JSON.parse(atob(localStorage.getItem('profile'))) : null;
    } else {
      this.logout();
    }
  }

  setProfile() {
    return this.http.get<any>(`${environment.api_url}/auth/me`).subscribe( data => {
        if (data.profile) {
          localStorage.setItem('profile', btoa(JSON.stringify(data.profile)));
          return true;
        }
        return false;
      });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getMenuPortal() {
    return this.http.get<any>(`${environment.api_url}/auth/menu`).subscribe(data => {
        if (data.profile) {
          localStorage.setItem('profile', btoa(JSON.stringify(data.profile)));
        }
    });
  }

  resetSenha(model: { cpf: number, dataNascimento: any, portal: string })  {
    model.portal = environment.portal;
    return this.http.post<any>(`${environment.api_url}/auth/resetPassword`, model);
  }
}
