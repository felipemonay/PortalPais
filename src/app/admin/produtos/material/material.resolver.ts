import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { MaterialService } from './material.service';


@Injectable({
  providedIn: 'root'
})
export class MaterialResolver implements Resolve<any> {

    constructor(private materialSrv: MaterialService) {}
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

        // paramMap.get('idMatricula')
        const idPessoa = route.params['idtipomaterial'];
        const idMatricula = route.params['idMatricula'];
        return this.materialSrv.getProduto(idPessoa, idMatricula);
    }
}
