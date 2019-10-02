import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CidadesResolver, EstadosResolver, TipoSexosResolver, NacionalidadesResolver } from './dropdown.resolver';
import { CarrinhoService } from './carrinho.service';
import { EnderecoService } from './endereco.service';
import { LogService } from './log.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    CarrinhoService,
    EnderecoService,
    NacionalidadesResolver,
    TipoSexosResolver,
    EstadosResolver,
    CidadesResolver,
    LogService
  ]
})
export class ServicesModule { }
