import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { HistoricoComprasService } from './historico-compras.service';
import { HistoricoCompras } from './historico-compras.model';

@Component({
  selector: 'app-historico-compras',
  templateUrl: './historico-compras.component.html',
  styleUrls: ['./historico-compras.component.scss']
})
export class HistoricoComprasComponent implements OnInit {
  historicoCompras: HistoricoCompras;
  idPessoa: number;
  listaMateriais: any[];
  listaNCE: any[];
  listaEventos: any[];
  listaCursoFerias: any[];

  constructor(
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    ) { }

  ngOnInit() {

    this.routeActiveSrv.data.subscribe(data => {
      this.historicoCompras = data.historicoCompras;
      console.log('historicoCompras', this.historicoCompras);
    });

    window.scrollTo(0, 0);
    }

    onSubmit(proximaRota: string) {
    this.navigateTo(proximaRota);
  }

  navigateTo(route: string, parm: any = '') {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }

  imagem(categoriaLoja: number, ev: any){
    console.log('cat',categoriaLoja);
    
    let src= `assets/img/produtos/${categoriaLoja}.jpg`;
    ev.target.src = src;
  }
}
