import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { HistoricoComprasService } from './historico-compras.service';

@Injectable({
  providedIn: 'root'
})
export class HistoricoComprasResolver implements Resolve<any> {

    constructor(private historicoComprasSrv: HistoricoComprasService) {}
    resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
      ): Observable<any>|Promise<any>|any {

      // paramMap.get('idMatricula')
      const id = route.params['idPessoa'];
      return this.historicoComprasSrv.get();
    }
}
