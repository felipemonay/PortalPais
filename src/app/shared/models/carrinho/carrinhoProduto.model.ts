import { CarrinhoFormaPgtoModel } from './carrinhoFormaPgto.model';

export class CarrinhoProdutoModel {
    id: number;
    idCategoriaLoja: number;
    nome: string;
    descricao: string;
    preco: number;
    foto: string;
    formasPgto: Array<CarrinhoFormaPgtoModel>;
    idMatricula: number;
    nomeAluno: string;
}
