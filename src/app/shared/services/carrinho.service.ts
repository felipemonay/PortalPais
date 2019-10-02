import { Injectable, EventEmitter } from '@angular/core';

import { CarrinhoFormaPgtoModel } from './../models/carrinho/carrinhoFormaPgto.model';
import { CarrinhoTurmaModel } from './../models/carrinho/carrinhoTurma.model';
import { Turma } from './../models/turma.model';
import { CarrinhoModel } from '../models/carrinho/carrinho.model';
import { Observable } from 'rxjs';
import { CarrinhoItemModel } from '../models/carrinho/carrinhoItem.model';
import { CarrinhoProdutoModel } from '../models/carrinho/carrinhoProduto.model';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  static carrinho$: any;
  static quantidadeAlterada = new EventEmitter();

  private _carrinho: CarrinhoModel = new CarrinhoModel();
  private carrinho: Observable<CarrinhoModel>;

  constructor(
  ) {
    // Inicializando nosso carrinho
    this._carrinho.datahora = new Date();
    this._carrinho.itens = new Array<CarrinhoItemModel>();
    this._carrinho.valorTotal = 0.0;

    // Inicializando nosso observable
    this.carrinho = Observable.create(dados => {
      CarrinhoService.carrinho$ = dados;
      CarrinhoService.carrinho$.next(this._carrinho);
    });
    console.log(CarrinhoService.carrinho$);
  }

  public getCarrinho(): Observable<CarrinhoModel> {
    return  CarrinhoService.carrinho$;
  }

  public adicionarNovoItem(
    produto: CarrinhoProdutoModel,
    turmaSelecionada: Array<CarrinhoTurmaModel> = new Array<CarrinhoTurmaModel>(),
    formaPgtoSelecionada: CarrinhoFormaPgtoModel = new CarrinhoFormaPgtoModel()
  ): void {
    console.log('produto', produto);
    console.log('turma', turmaSelecionada);
    console.log('forma', formaPgtoSelecionada);

    let isExiste = false;

    this._carrinho.itens.forEach(item => {
      if (item.produto.id === produto.id &&
          item.produto.idMatricula === produto.idMatricula) {
        if ( formaPgtoSelecionada ) {
          item.valorVenda = ((1 - ( formaPgtoSelecionada.desconto / 100)) * produto.preco);
        } else {
          item.valorVenda = produto.preco;
        }
        item.quantidade ++;
        isExiste = true;
      }
    });

    // produto novo
    if (!isExiste) {
      let newProduto = new CarrinhoItemModel();

      if ( formaPgtoSelecionada ) {
        newProduto.valorVenda = ((1 - ( formaPgtoSelecionada.desconto / 100)) * produto.preco);
      } else {
        newProduto.valorVenda = produto.preco;
      }
      newProduto.produto = produto;
      newProduto.formaPgtoSelecionada = formaPgtoSelecionada;
      newProduto.turmasSelecionadas = turmaSelecionada;
      newProduto.quantidade = 1;
      this._carrinho.itens.push(newProduto);
    }

    this._calcularCarrinho();
    CarrinhoService.quantidadeAlterada.emit(this._carrinho.itens.length);
    this.carrinho.subscribe(dados => {
      CarrinhoService.carrinho$ = dados;
      // CarrinhoService.carrinho$.next(this._carrinho);
    });

    console.log('carrinho', CarrinhoService.carrinho$);

    // CarrinhoService.carrinho$.next(this._carrinho);
    // this.carrinho.emit (this._carrinho);

  }

  public removerItem(item: CarrinhoProdutoModel): void {
    for (let index = 0; index < this._carrinho.itens.length; index++) {
      const prod = this._carrinho.itens[index];
      if (prod.produto.id === item.id) {
        if (prod.quantidade <= 1) {
          this._carrinho.itens.splice(index, 1);
        } else {
          this._carrinho.itens[index].quantidade--;
        }
      }
    }
    this._calcularCarrinho();
    CarrinhoService.carrinho$.next(this._carrinho);
    // t;.criouNovoCurso.emit(curso);

  }

  public getQuantidadeItem(item: CarrinhoProdutoModel): number {
    let prod = this._carrinho.itens.filter(x => x.produto.id === item.id)[0];
    if (prod) {
      return prod.quantidade;
    } else {
      return 0;
    }
  }

  private _calcularCarrinho(): void {
    this._carrinho.valorTotal = 0;
    this._carrinho.itens.forEach((item: CarrinhoItemModel) => {
      if (item.formaPgtoSelecionada) {
        item.valorVenda = ((1 - ( item.formaPgtoSelecionada.desconto / 100)) * item.produto.preco);
      } else {
        item.valorVenda = item.produto.preco;
      }
      this._carrinho.valorTotal += (item.valorVenda * item.quantidade);
    });
  }


  public SalvarPedido(pedido: CarrinhoModel) {

    let _pedido: any = {};
    _pedido.valorTotal = pedido.valorTotal;
    _pedido.itens = [];

    pedido.itens.forEach(prod => {
      _pedido.itens.push({
        quantidade: prod.quantidade,
        produtoId: prod.produto.id
      });
    });

    _pedido.itens = JSON.stringify(_pedido.itens);

    // return this.http.post(`${ConfigHelper.Url}/pedido`, _pedido);
  }
  public GetMeusPedidos() {
    // return this.http.get(`${ConfigHelper.Url}/pedido`);
  }


}
