import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

import { PlanoPagService } from './plano-pag.service';
import { PlanoPagEscolhido } from './plano-pagEscolhido.model';
import { PlanoPag } from './plano-pag.model';
import { forEach } from '@angular/router/src/utils/collection';
import { LogService } from 'src/app/shared/services/log.service';

@Component({
  selector: 'app-plano-pag',
  templateUrl: './plano-pag.component.html',
  styleUrls: ['./plano-pag.component.scss',
              '../matricula.component.scss']
})
export class PlanoPagComponent implements OnInit {
  f: FormGroup;
  formStatus = false;
  idMatricula: number;
  planoEscolhido: PlanoPagEscolhido;
  planos: PlanoPag[];
  planoVencimento: any;

  constructor(
    private fbSrv: FormBuilder,
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private locationSrv: Location,
    private planoPagSrv: PlanoPagService,
    private toastrSrv: ToastrService,
    private logSrv: LogService
  ) {
    this.idMatricula = Number(this.routeActiveSrv.snapshot.paramMap.get('idMatricula'));
    console.log(this.idMatricula);
  }

  ngOnInit() {

    window.scrollTo(0, 0);
    this.routeActiveSrv.data.subscribe(data => {
      this.planoEscolhido    = data.planoEscolhido;
      this.planos            = data.planos;
      this.planoVencimento   = data.planoEscolhido;
    });
    // console.log('diaV', this.planoVencimento);


    // console.log('planoEscolhidoRout', this.planoEscolhido);
    // console.log('planos', this.planos);

    this.f = this.fbSrv.group({
      plano: [this.planoEscolhido, [Validators.required]]
    });

  }

  selecionaPlano(ev: any) {
    this.f.controls.plano.patchValue(ev);
    this.planoEscolhido = ev;
    // console.log('planoEscolhido', this.planoEscolhido);
    // console.log('f', this.f.value);
    
  }

  onSubmit() {
    // console.log('fSubmit',this.f.value);
    if (this.f.valid && !this.formStatus) {
      this.formStatus = true;
      console.log('submit');
      
      let data = this.f.value;
      // console.log('data1', data);
      if (data.plano.idprecificacao === this.planoVencimento.idPrecificacao) {
        data.plano.planosPagamento = this.planoVencimento.planosPagamento;
      }
      // console.log('data2', data);
      
      this.planoPagSrv.save(data, this.idMatricula).subscribe(success => {
          this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 600});
          this.navigateTo('/admin/matricula/contrato', {idMatricula: this.idMatricula});
      }, (err) => {
        this.formStatus = false;
        this.trataErro(err);
        console.error(err);
      });

    } else {
      window.scrollTo(0, 0);
      this.mostraErrosForm(this.f);
    }
  }

  trataErro(err: HttpErrorResponse) {
    this.logSrv.log('planoPagamento', 'tratamento de erro BackEnd', this.f.value, err);
    // console.log(err);
    try {
      const arrKeys = Object.keys(err.error);
      const config = {
        'progressBar': true,
        maxOpened: 5
      };
      arrKeys.forEach(key => {
        const arrKeyErros = err.error[key];
        if (Array.isArray(arrKeyErros)) {
          arrKeyErros.forEach(errorMessage => {
            this.toastrSrv.error(errorMessage, '', config).onTap.pipe(take(1));
          });
        } else {
          this.toastrSrv.error(arrKeyErros, '').onTap.pipe(take(1));
        }
      });
    } catch (error) {
      console.log('Erro Não tratado handle', error);
      this.toastrSrv.error('Ocorreu um erro inesperado!!!', '').onTap.pipe(take(1));
    }
  }

  mostraErrosForm(formGroup) {
    // console.log('teste');
    Object.keys(formGroup.controls).forEach(campo => {
      const control = formGroup.get(campo);
      if (control instanceof FormControl) {
        if (control.invalid) {
          this.logSrv.log('planoPagamento',
                          'tratamento de erro FrontEnd',
                         {
                          'idMatricula': this.idMatricula,
                          'campo': campo,
                          'value': control.value
                        });
          this.toastrSrv.warning(`O campo ${campo} deve ser prenchido` , 'Existem campos incompletos', {timeOut: 3000});
        }
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.mostraErrosForm(control);
      }
    });
  }

  navigateTo(route: string, parm: any = []) {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }

  backClicked() {
    this.locationSrv.back();
  }


}
