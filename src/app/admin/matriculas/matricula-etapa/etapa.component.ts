import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-etapa',
  templateUrl: './etapa.component.html',
  styleUrls: ['./etapa.component.scss']
})
export class EtapaComponent implements OnInit {

  @Input() pagina: string;

  etapas: Array<{ src: string, path: string, label: string, isSelect: boolean }>;

  constructor(
  ) { }

  ngOnInit() {
    this.etapas =  [
      { src: 'assets/img/logos/logo15.png', path: 'aluno',      label: 'Dados do Aluno',         isSelect: this.pagina === 'aluno' },
      { src: 'assets/img/logos/logo15.png', path: 'filiacao',   label: 'Filiação',               isSelect: this.pagina === 'filiacao' },
      { src: 'assets/img/logos/logo15.png', path: 'respFin',    label: 'Responsável Financeiro', isSelect: this.pagina === 'responsavelFinanceiro'},
      { src: 'assets/img/logos/logo15.png', path: 'responsavelPedagogico',  label: 'Responsável Pedagógico', isSelect: this.pagina === 'responsavelPedagogico'},
      { src: 'assets/img/logos/logo15.png', path: 'fichaSaude', label: 'Ficha de Saúde',         isSelect: this.pagina === 'fichaSaude'},
      { src: 'assets/img/logos/logo15.png', path: 'fichaSaida', label: 'Ficha de Saída',         isSelect: this.pagina === 'fichaSaida'},
      { src: 'assets/img/logos/logo15.png', path: 'documentos', label: 'Documentos',             isSelect: this.pagina === 'documentos'},
      { src: 'assets/img/logos/logo15.png', path: 'planoPagamento',   label: 'Plano de Pagamento',     isSelect: this.pagina === 'planoPagamento'},
      { src: 'assets/img/logos/logo15.png', path: 'contrato',   label: 'Contrato',               isSelect: this.pagina === 'contrato'}
    ];
    console.log('pagina',this.pagina)

    // let lista: any;

    // lista = this.etapas.filter((item) => {
    //   return ((item.path.toLowerCase().indexOf(this.pagina.toLowerCase()) > -1));
    // });

    // console.log('lista:', lista);
    // console.log('objeto', this.etapas);
  }

  // "Dados do Aluno",
  // "Filiação",
  // "Responsável Financeiro",
  // "Responsável Pedagógico",
  // "Ficha de Saúde",
  // "Autorização de Saída",
  // "Ficha de Transporte",
  // "Documentos",
  // "Plano de Pagamento",
  // "Contrato
  selecionarTab(path: string): void {
    // this.navCtrl.setRoot(path);
  }



}
