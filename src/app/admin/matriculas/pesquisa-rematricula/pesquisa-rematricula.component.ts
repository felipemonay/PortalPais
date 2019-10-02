import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

import { PesquisaRematricula } from './pesquisa-rematricula.model';
import { PesquisaRematriculaService } from './pesquisa-rematricula.service';

@Component({
  selector: 'app-pesquisa-rematricula',
  templateUrl: './pesquisa-rematricula.component.html',
  styleUrls: ['./pesquisa-rematricula.component.scss']
})
export class PesquisaRematriculaComponent implements OnInit {
  filter = '';

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<string> = new Subject();
  pesquisaRematricula: PesquisaRematricula[];
  lista = this.pesquisaRematricula;
  debounce: Subject<string> = new Subject<string>();
  listaUnidades: any[];
  listaSeries: any[];
  listaTurmas: any[];
  nome: ' ';
  unidade: number;
  serie: number;
  turma: number;

  constructor(
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private pesquisaRematriculaSrv: PesquisaRematriculaService
  ) { }

  ngOnInit() {
  this.routeActiveSrv.data.subscribe(data => {
    this.pesquisaRematricula  = data.pesquisaRematricula;
    this.listaUnidades        = [];
    this.listaSeries          = [];
    this.listaTurmas          = [];
    this.lista = this.pesquisaRematricula;
    console.log('pesquisaRematricula', this.pesquisaRematricula);
    // this.debounce
    //               .pipe(debounceTime(600), tap(console.log))
    //               .subscribe(filter => this.filtraAluno());
  });

  window.scrollTo(0, 0);

  this.dtOptions = {
    pagingType: 'full_numbers',
    pageLength: 10
  };

  this.pesquisaRematriculaSrv.get()
    // .map(this.extractData)
    .subscribe(lista => {
      this.lista = lista;
      // Calling the DT trigger to manually render the table
      this.dtTrigger.next();
    });
  }

  private extractData(res: any) {
    const body = res.json();
    return body.data || {};
  }

  filtraAluno(): void {
    console.log('nome', this.nome);
    console.log('unidade', this.unidade);
    console.log('serie', this.serie);
    console.log('turma', this.turma);

    if (this.unidade) {
      this.lista = this.pesquisaRematricula.filter((item) => {
        // console.log('item', item);

        return (
          // (item.aluno.indexOf(this.nome) > -1) ||
          item.idUnidade === this.unidade
          // (item.idSerie === this.serie) ||
          // (item.idTurma === this.turma)
        );
      });
    } else {
      this.lista = this.pesquisaRematricula;
    }
  }

}
