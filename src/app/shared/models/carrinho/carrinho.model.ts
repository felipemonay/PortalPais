import { CarrinhoItemModel } from './carrinhoItem.model';

export class CarrinhoModel {

    datahora: Date;
    valorCartao: number ;
    valorBoleto: number ;
    valorTotal: number ;
    itens: Array<CarrinhoItemModel>;

    constructor() {
        this.itens = new Array<CarrinhoItemModel>();
        this.valorTotal = 0.0;
        this.valorCartao = 0.0;
        this.valorBoleto = 0.0;
    }
}
