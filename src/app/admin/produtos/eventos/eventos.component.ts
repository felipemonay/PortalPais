import { EventosService } from './eventos.service';
import { Component, OnInit } from '@angular/core';
import { Eventos } from './eventos.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResponsavelFinanceiro } from '../../matriculas/matricula-resp-fin/resp-fin.model';
import { throwError } from 'rxjs';
import { CarrinhoProdutoModel } from 'src/app/shared/models/carrinho/carrinhoProduto.model';
import { CarrinhoFormaPgtoModel } from 'src/app/shared/models/carrinho/carrinhoFormaPgto.model';
import { CarrinhoTurmaModel } from 'src/app/shared/models/carrinho/carrinhoTurma.model';
import { CarrinhoModel } from 'src/app/shared/models/carrinho/carrinho.model';
import { CarrinhoService } from './../../../shared/services/carrinho.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  f: FormGroup;
  formStatus = false;
  eventos: Eventos;
  idtipomaterial: number;
  idMatricula: number;
  nomeAluno: string;
  produtoCarrinho: CarrinhoProdutoModel = new CarrinhoProdutoModel();
  carrinho: CarrinhoModel = new CarrinhoModel();

  constructor(
    private fbSrv: FormBuilder,
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private toastrSrv: ToastrService,
    private eventosSrv: EventosService,
    private carrinhoSrv: CarrinhoService,
    ) {
      this.idtipomaterial = Number(this.routeActiveSrv.snapshot.paramMap.get('idtipomaterial'));
      this.idMatricula = Number(this.routeActiveSrv.snapshot.paramMap.get('idMatricula'));
      this.nomeAluno = this.routeActiveSrv.snapshot.paramMap.get('nome');
    }

  ngOnInit() {

    this.routeActiveSrv.data.subscribe(data => {
      this.eventos              = data.eventos;
      console.log('eventos', this.eventos);
    });

    this.f = this.fbSrv.group({
      termoAdesao: [null, [Validators.required]]
    });

    this.carrinhoSrv.getCarrinho().subscribe(data => {
      this.carrinho = data;
      console.log('obs', this.carrinho);
    });

    window.scrollTo(0, 0);
    }
    
    verificaValidTouched(form: FormGroup | FormArray, nomeCampo: string) {
      return (
        !form.get(nomeCampo).valid &&
        (form.get(nomeCampo).touched || form.get(nomeCampo).dirty)
      );
    }

    aplicaCssErro(nomeCampo: string) {
      return {
        'has-error': this.verificaValidTouched(this.f, nomeCampo),
        'has-feedback': this.verificaValidTouched(this.f, nomeCampo)
      };
    }

    onSubmit() {
      console.log(this.formStatus);
      // if (this.f.valid && !this.formStatus) {
        this.formStatus = true;
        this.produtoCarrinho.id = this.idtipomaterial;
        this.produtoCarrinho.nome  = (this.eventos.descricaoVenda) ? this.eventos.descricaoVenda : this.eventos.descricao;
        this.produtoCarrinho.descricao  = this.eventos.descricaoVenda;
        this.produtoCarrinho.foto = this.eventos.imgproduto;
        this.produtoCarrinho.formasPgto = <CarrinhoFormaPgtoModel[]>this.eventos.planosPagamento;
        this.produtoCarrinho.idCategoriaLoja = this.eventos.idCategoriaLoja;
        this.produtoCarrinho.preco = this.eventos.precoVenda;
        this.produtoCarrinho.nomeAluno = this.nomeAluno;  
        let turmas = new Array<CarrinhoTurmaModel>();
        let pgtos = new CarrinhoFormaPgtoModel();
        this.carrinhoSrv.adicionarNovoItem(this.produtoCarrinho, turmas, pgtos );
        // console.log('aa', cep.value);
        // this.eventosSrv.save(this.f.value, this.idMatricula).subscribe(success => {
        //   console.log('success', success);
        //   const data = (this.idMatricula) ? this.idMatricula : success.matricula.idMatricula;
  
        //     this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 1000});
        //     // this.navigateTo('/admin/matricula/filiacao', {idMatricula: data});
        //     this.formStatus = false;
        // }, (err) => {
        //   this.formStatus = false;
        //   return throwError(err);
        // });
        console.log('carrinho', this.carrinho);
      // } else {
      //   window.scrollTo(0, 0);
      //   this.mostraErrosForm(this.f);
      // }
    }

    mostraErrosForm(formGroup) {
      Object.keys(formGroup.controls).forEach(campo => {
        const control = formGroup.get(campo);
        if (control instanceof FormControl) {
          control.markAsDirty();
          control.markAsTouched();
          if (control.invalid) {
            this.toastrSrv.warning(`O campo ${campo} deve ser prenchido` , 'Existem campos incompletos', {timeOut: 3000});
          }
        } else if (control instanceof FormGroup) {
          this.mostraErrosForm(control);
        }
      });
    }

}
