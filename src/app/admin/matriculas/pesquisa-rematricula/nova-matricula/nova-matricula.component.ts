import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nova-matricula',
  templateUrl: './nova-matricula.component.html',
  styleUrls: ['./nova-matricula.component.scss',
              '../pesquisa-rematricula.component.scss']
})
export class NovaMatriculaComponent implements OnInit {

  f: FormGroup;
  listaUnidades: any[];
  listaCursos: any[];
  listaPeriodosLetivos: any[];
  listaSeries: any[];
  listaTurmas: any[];

  constructor(
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private fbSrv: FormBuilder,
  ) { }

  ngOnInit() {
    this.routeActiveSrv.data.subscribe(data => {
      this.listaUnidades        = data.unidades;
      this.listaCursos          = data.cursos;
      this.listaPeriodosLetivos = data.periodosLetivos;
      this.listaSeries          = data.series;
      this.listaTurmas          = data.turmas;
    });

    window.scrollTo(0, 0);

    this.f = this.fbSrv.group({
      idUnidade:          [''],
      idCurso:            [''],
      idPeriodoLetivo:    [''],
      idSerie:            [''],
      idTurma:            ['']
    });
  }

  onSubmit() {
    console.log(this.f.value);
    
    this.navigateTo('/admin/matricula/aluno', this.f.value);
  }

  navigateTo(route: string, parm: any = '') {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }

}
