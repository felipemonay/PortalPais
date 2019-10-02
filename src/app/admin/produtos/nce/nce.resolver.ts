import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { NceService } from './nce.service';


@Injectable({
  providedIn: 'root'
})
export class NceResolver implements Resolve<any> {

    constructor(private nceSrv: NceService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // paramMap.get('idMatricula')
        const idProduto = route.params['idtipomaterial'];
        const idMatricula = route.params['idMatricula'];
        return this.nceSrv.getProduto(idProduto, idMatricula);
    }
}
