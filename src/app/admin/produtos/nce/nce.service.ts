import { Nce } from './nce.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NceService {

    constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    public getProduto(idProduto: number, idMatricula: number ): Observable<any> {
      // idProduto = idtipomaterial
      return this.http.get<Nce>(`${environment.api_url}/produto/detalhe/${idProduto}/${idMatricula}`);
    }
 }


