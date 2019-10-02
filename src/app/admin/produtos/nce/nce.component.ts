import { CarrinhoService } from './../../../shared/services/carrinho.service';
import { NceService } from './nce.service';
import { Component, OnInit } from '@angular/core';
import { Nce } from './nce.model';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarrinhoProdutoModel } from 'src/app/shared/models/carrinho/carrinhoProduto.model';
import { CarrinhoFormaPgtoModel } from 'src/app/shared/models/carrinho/carrinhoFormaPgto.model';
import { CarrinhoTurmaModel } from 'src/app/shared/models/carrinho/carrinhoTurma.model';
import { CarrinhoModel } from 'src/app/shared/models/carrinho/carrinho.model';

@Component({
  selector: 'app-nce',
  templateUrl: './nce.component.html',
  styleUrls: ['./nce.component.scss']
})
export class NceComponent implements OnInit {

  f: FormGroup;
  formStatus = false;
  nce: Nce;
  idtipomaterial: number;
  idMatricula: number;
  nomeAluno: string;
  // turmas: Array<CarrinhoTurmaModel>;
  produtoCarrinho: CarrinhoProdutoModel = new CarrinhoProdutoModel();
  carrinho: CarrinhoModel = new CarrinhoModel();

  constructor(
    private fbSrv: FormBuilder,
    private routeActiveSrv: ActivatedRoute,
    private toastrSrv: ToastrService,
    private carrinhoSrv: CarrinhoService,
  ) {
    this.idtipomaterial = Number(this.routeActiveSrv.snapshot.paramMap.get('idtipomaterial'));
    this.idMatricula = Number(this.routeActiveSrv.snapshot.paramMap.get('idMatricula'));
    this.nomeAluno = this.routeActiveSrv.snapshot.paramMap.get('nome');
  }


  ngOnInit() {
    // console.log(this.idtipomaterial);
    this.routeActiveSrv.data.subscribe(data => {
      this.nce = data.nce;
      // console.log('nce', this.nce);
    });

    // this.carrinhoSrv.getCarrinho().subscribe(data => {
    //   this.carrinho = data;
    //   // console.log('obs', this.carrinho);
    // });

    this.f = this.fbSrv.group({
      turmas: [null],
      termoAdesao: [null, [Validators.required]],
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
      this.produtoCarrinho.nome  = (this.nce.descricaoVenda) ? this.nce.descricaoVenda : this.nce.descricao;
      this.produtoCarrinho.descricao  = this.nce.descricaoVenda;
      this.produtoCarrinho.foto = this.nce.imgproduto;
      this.produtoCarrinho.formasPgto = <CarrinhoFormaPgtoModel[]>this.nce.planosPagamento;
      this.produtoCarrinho.idCategoriaLoja = this.nce.idCategoriaLoja;
      this.produtoCarrinho.preco = this.nce.precoVenda;
      this.produtoCarrinho.nomeAluno = this.nomeAluno;

      this.carrinhoSrv.adicionarNovoItem(this.produtoCarrinho);

      CarrinhoService.quantidadeAlterada.subscribe(teste => {
        console.log('carrinho', teste);
      });

      // console.log('carrinho', this.carrinho);
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


