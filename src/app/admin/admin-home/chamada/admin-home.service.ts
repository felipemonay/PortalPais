

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private http: HttpClient
  ) { }

  public get(id: number = 1): Observable<any> {
    // id = id tipo  de curso
    // 1 = regular
    // 2 = complementar
    return this.http.get<any>(`${environment.api_url}/matricula/home/${id}`);
  }

//   public getByID(id: number ): Observable<any> {
//     // id = idMatricula
//     return this.http.get<any>(`${environment.api_url}/matricula/aluno/${id}`);
//   }
}


