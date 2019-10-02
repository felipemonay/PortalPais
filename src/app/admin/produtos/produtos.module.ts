import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialComponent } from './material/material.component';
import { NceComponent } from './nce/nce.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { EventosComponent } from './eventos/eventos.component';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { ListaProdutosComponent } from './lista-produtos/lista-produtos.component';

@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    NgbModule,
    ProdutosRoutingModule
  ],
  declarations: [
    MaterialComponent,
    CarrinhoComponent,
    NceComponent,
    EventosComponent,
    ListaProdutosComponent
  ]
})
export class ProdutosModule { }
