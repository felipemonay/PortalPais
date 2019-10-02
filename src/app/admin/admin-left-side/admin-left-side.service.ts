

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLeftSideService {

  constructor(
    private http: HttpClient
  ) { }

  public get(): Observable<any> {
    // id = idMatricula
    return this.http.get<any>(`${environment.api_url}/auth/alunos`);
  }
}


