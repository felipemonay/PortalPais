import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { EventosService } from './eventos.service';


@Injectable({
  providedIn: 'root'
})
export class EventosResolver implements Resolve<any> {

    constructor(private eventosSrv: EventosService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // paramMap.get('idMatricula')
        const idProduto = route.params['idtipomaterial'];
        const idMatricula = route.params['idMatricula'];
        return this.eventosSrv.getProduto(idProduto, idMatricula);
    }
}
