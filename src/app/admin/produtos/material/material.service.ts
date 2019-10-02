import { Material } from './material.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

    constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    public getProduto(idPessoa: number, idMatricula ): Observable<any> {
      // id = idMatricula
      return this.http.get<Material>(`${environment.api_url}/produto/detalhe/${idPessoa}/${idMatricula}`);
    }
 }


