export interface Nce {
    descricao: string;
    precoVenda: number;
    idCategoriaLoja: number;
    descricaoVenda: string;
    termoadesao: string;
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
    turmas: [{
        idTurma: number;
        descricao: string;
        vagas: number;
        detalhes: string;
    }]
}
