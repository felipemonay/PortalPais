import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProdutosService } from './lista-produtos.service';
import { Produtos } from './lista-produtos.model';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {
  produtos: Produtos;
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
      this.produtos = <Produtos>data.produtos;
      this.listaMateriais   = <any[]>this.produtos.material;
      this.listaNCE         = <any[]>this.produtos.nce;
      this.listaEventos     = <any[]>this.produtos.evento;
      this.listaCursoFerias = <any[]>this.produtos.ferias;

      console.log('produtos', this.produtos);
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

  comprar(produto: any) {
    console.log('produto:', produto);
    switch (produto.idcategorialoja) {
      case 1:
        this.navigateTo('/admin/produtos/material/', produto);
        break;
      case 2:
        this.navigateTo('/admin/produtos/nce/', produto);
        break;
      case 3:
      case 4:
        this.navigateTo('/admin/produtos/eventos/', produto);
        break;
    }

    // ['/admin/produtosMaterial/',{idtipomaterial: produto.idtipomaterial, idMatricula: produto.idMatricula}]
  }
  // FILTRO
  // getProdutos(ev: any): void {
  //   const val = ev.target.value;
  //   if (val && val.trim() != '') {
  //       this.atividades = this.atividades.filter((item) => {
  //     return (
  //       (item.numero.toString().toLowerCase().indexOf(val.toLowerCase()) > -1) ||
  //       (item.nome.toLowerCase().indexOf(val.toLowerCase()) > -1)
  //     );
  //   })
  //   } else {
  //   this._loadAtividades();
  //   }

}
