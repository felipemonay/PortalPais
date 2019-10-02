import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { PesquisaRematricula } from './pesquisa-rematricula.model';

@Injectable({
  providedIn: 'root'
})
export class PesquisaRematriculaService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    public get(): Observable<PesquisaRematricula[]> {
      // id = idMatricula
      return this.http.get<PesquisaRematricula[]>(`${environment.api_url}/matricula/matriculas`);
    }

    public getProduto(id): Observable<any> {
      return this.http.get<any>(`${environment.api_url}/produto/${id}`);
    }
 }
