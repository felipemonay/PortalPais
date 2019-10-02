import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { PesquisaRematriculaService } from './pesquisa-rematricula.service';

@Injectable({
  providedIn: 'root'
})
export class PesquisaRematriculaResolver implements Resolve<any> {

    constructor(private pesquisaRematriculaSrv: PesquisaRematriculaService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // paramMap.get('idMatricula')
        return this.pesquisaRematriculaSrv.get();
    }
}
