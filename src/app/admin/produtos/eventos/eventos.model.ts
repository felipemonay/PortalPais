export interface Eventos {

    descricao: string;
    precoVenda: number;
    idCategoriaLoja: number;
    descricaoVenda: string;
    termoadesao: string;
    detalhes: string;
    imgproduto: string;

    planosPagamento: [{
        idFormaPagamentoMaterial: number;
        descricao: string;
        desconto: number;
        cartao: number;
        parcelas: number;
        mensal: number;
        meses: number;
        diaVencimento: number;
    }];

    itens: [{
        iditemmaterial: number;
        descricao: string;
        desconto: number;
        face: string;
        valor: any;
        tipo: string;
    }];
}
