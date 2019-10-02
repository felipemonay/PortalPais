import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    private updateImagem(model) {
      console.log('update:', model);
      return this.http.put<any>(`${environment.api_url}/auth/perfil`, model);
    }

    saveImagem(model) {
        return this.updateImagem(model);
    }

    private updateSenha(model) {
        console.log('update:', model);
        return this.http.put<any>(`${environment.api_url}/auth/att`, model);
    }

    saveSenha(model) {
        return this.updateSenha(model);
    }

 }


