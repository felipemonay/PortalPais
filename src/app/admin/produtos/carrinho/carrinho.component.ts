import { Component, OnInit } from '@angular/core';
import { CarrinhoModel } from 'src/app/shared/models/carrinho/carrinho.model';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.scss']
})
export class CarrinhoComponent implements OnInit {

  carrinho$: CarrinhoModel = new CarrinhoModel();

  constructor(
    private carrinhoSrv: CarrinhoService
  ) { }

  ngOnInit() {
    this.carrinho$ = CarrinhoService.carrinho$;
    console.log(this.carrinho$);
  }

}
