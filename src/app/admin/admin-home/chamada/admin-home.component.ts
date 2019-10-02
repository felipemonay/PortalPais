import { Matricula } from './../../matriculas/matricula-aluno/matricula.model';
import { ToastrService } from 'ngx-toastr';
import { Home } from './admin-home.model';
import { HomeService } from './admin-home.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

import { } from 'daterangepicker';
import { Observable, empty } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BlacklistComponent } from './blacklist/blacklist.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  alunos$: Observable<Home[]>;
  matriculado: boolean;
  rematricula = 'hidden';
  tipoCurso: string;

  constructor(
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private homeSrv: HomeService,
    private toastrSrv: ToastrService,
    private modalService: NgbModal
  ) {
    // this.tipoCurso = this.routeActiveSrv.snapshot.paramMap.get('TipoCurso');
    // console.log(this.tipoCurso);
  }

  ngOnInit() {
    let idTipoCurso: number;
    this.alunos$ = this.routeActiveSrv.paramMap.pipe(
      switchMap(params => {
        this.tipoCurso = params.get('TipoCurso');
        if (this.tipoCurso === 'regular') { idTipoCurso = 1; }
        if (this.tipoCurso === 'extracurricular') { idTipoCurso = 2; }
        return this.homeSrv.get(idTipoCurso);
      })
    );



    // this.alunos$ = this.homeSrv.get(idTipoCurso).pipe(
    //   // map(),
    //   tap(console.log),
    //   // switchMap(),
    //   catchError(error => {
    //   console.error(error);
    //   // this.error$.next(true);
    //   // alert('erro');
    //   return empty();
    //   })
    // );
    // console.log('home',this.alunos$);
  }

  onSubmit(proximaRota: string) {
    this.navigateTo(proximaRota);
  }

  navigateTo(route: string, parm: any = '') {
    // console.log(parm);
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
    // this.routerSrv.navigate([route], { relativeTo: this.routeActiveSrv});
  }

  open(titulo, mensagem) {
    const modalRef = this.modalService.open(BlacklistComponent, { centered: true });
    modalRef.componentInstance.titulo = titulo;
    modalRef.componentInstance.mensagem = mensagem;
  }
}
