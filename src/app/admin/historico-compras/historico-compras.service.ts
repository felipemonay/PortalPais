import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HistoricoCompras } from './historico-compras.model';

@Injectable({
  providedIn: 'root'
})
export class HistoricoComprasService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    public get(): Observable<any> {
      // id = idMatricula
      return this.http.get<HistoricoCompras[]>(`${environment.api_url}/compra`);
    }
 }
