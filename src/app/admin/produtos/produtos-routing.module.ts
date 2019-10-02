import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialComponent } from './material/material.component';
import { MaterialResolver } from './material/material.resolver';
import {
  NacionalidadesResolver,
  TipoSexosResolver,
  OrgaoEmissorResolver,
  EstadosResolver,
  CidadesResolver } from 'src/app/shared/services/dropdown.resolver';
import { EventosComponent } from './eventos/eventos.component';
import { EventosResolver } from './eventos/eventos.resolver';
import { NceComponent } from './nce/nce.component';
import { NceResolver } from './nce/nce.resolver';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';
import { ProdutosResolver } from './lista-produtos/lista-produtos.resolver';
import { RespFinResolver } from '../matriculas/matricula-resp-fin/resp-fin.resolver';



const routesProdutos: Routes = [
  {
    path: '',
    component: ListaProdutosComponent,
    resolve: {
      produtos: ProdutosResolver,
    }
  } , {
    path: 'lista',
    component: ListaProdutosComponent,
    resolve: {
      produtos: ProdutosResolver,
    }
  } , {
    path: 'material',
    component: MaterialComponent,
    resolve: {
      material       : MaterialResolver,
      nacionalidades : NacionalidadesResolver,
      tipoSexos      : TipoSexosResolver,
      OrgaoEmissores : OrgaoEmissorResolver,
      estados        : EstadosResolver,
      cidades        : CidadesResolver,
      respFin        : RespFinResolver
    }
  } , {
    path: 'eventos',
    component: EventosComponent,
    resolve: {
      eventos        : EventosResolver,
      nacionalidades : NacionalidadesResolver,
      tipoSexos      : TipoSexosResolver,
      OrgaoEmissores : OrgaoEmissorResolver,
      estados        : EstadosResolver,
      cidades        : CidadesResolver,
      respFin        : RespFinResolver
    }
  } , {
    path: 'nce',
    component: NceComponent,
    resolve: { nce: NceResolver}
  }
];


@NgModule({
  imports: [RouterModule.forChild(routesProdutos)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule { }
