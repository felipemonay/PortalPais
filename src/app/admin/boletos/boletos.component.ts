import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';

import { BoletosService } from './boletos.service';
import { Observable, Subject } from 'rxjs';
import { Boletos } from './boletos.model';

@Component({
  selector: 'app-boletos',
  templateUrl: './boletos.component.html',
  styleUrls: ['./boletos.component.scss']
})
export class BoletosComponent implements OnInit {
  boletos: Boletos;
  lista = this.boletos;
  dtOptions: any = {};

  constructor(
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private locationSrv: Location,
    private boletosSrv: BoletosService
    ) { }

  ngOnInit() {

    this.routeActiveSrv.data.subscribe(data => {
      this.boletos = data.boletos.boletos;
      console.log('boletos', this.boletos);
    });

    this.dtOptions = {
      // pagingType: 'full_numbers',
      // pageLength: 10
      language:
      {
        'sEmptyTable': 'Nenhum registro encontrado',
        'sInfo': 'Mostrando de _START_ até _END_ de _TOTAL_ registros',
        'sInfoEmpty': 'Mostrando 0 até 0 de 0 registros',
        'sInfoFiltered': '(Filtrados de _MAX_ registros)',
        'sInfoPostFix': '',
        'sInfoThousands': '.',
        'sLengthMenu': '_MENU_ resultados por página',
        'sLoadingRecords': 'Carregando...',
        'sProcessing': 'Processando...',
        'sZeroRecords': 'Nenhum registro encontrado',
        'sSearch': 'Pesquisar',
        'oPaginate': {
            'sNext': 'Próximo',
            'sPrevious': 'Anterior',
            'sFirst': 'Primeiro',
            'sLast': 'Último'
        },
        'oAria': {
            'sSortAscending': ': Ordenar colunas de forma ascendente',
            'sSortDescending': ': Ordenar colunas de forma descendente'
        }
    }
  };

    // this.boletosSrv.get()
    // // .map(this.extractData)
    // .subscribe(lista => {
    //   this.lista = lista;
    //   // Calling the DT trigger to manually render the table
    //   this.dtTrigger.next();
    // });

    // this.boletosSrv.get().subscribe(resp => {
    //   this.boletos$ = resp;
    //   console.log('resp' , resp);
    // });
    window.scrollTo(0, 0);
   }


   onSubmit(proximaRota: string) {
    this.navigateTo(proximaRota);
  }

  navigateTo(route: string, parm: any = '') {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }

  backClicked() {
    this.locationSrv.back();
  }

  getBoleto(boleto) {
    window.open(boleto);
  }
}
