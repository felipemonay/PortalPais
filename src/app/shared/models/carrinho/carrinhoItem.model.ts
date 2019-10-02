import { CarrinhoProdutoModel } from './carrinhoProduto.model';
import { CarrinhoTurmaModel } from './carrinhoTurma.model';
import { CarrinhoFormaPgtoModel } from './carrinhoFormaPgto.model';

export class CarrinhoItemModel {

    produto: CarrinhoProdutoModel;
    quantidade: number;
    valorVenda: number;
    formaPgtoSelecionada: CarrinhoFormaPgtoModel;
    turmasSelecionadas: Array<CarrinhoTurmaModel>;

    constructor() {
        this.turmasSelecionadas = new Array<CarrinhoTurmaModel>();
        this.quantidade = 0;
        this.valorVenda = 0;
    }
}
