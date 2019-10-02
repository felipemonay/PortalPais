import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormArray, FormControl } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

import { MaterialService } from './material.service';
import { Material } from './material.model';
import { CarrinhoProdutoModel } from 'src/app/shared/models/carrinho/carrinhoProduto.model';
import { CarrinhoFormaPgtoModel } from 'src/app/shared/models/carrinho/carrinhoFormaPgto.model';
import { CarrinhoTurmaModel } from 'src/app/shared/models/carrinho/carrinhoTurma.model';
import { CarrinhoModel } from 'src/app/shared/models/carrinho/carrinho.model';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  f: FormGroup;
  formStatus = false;
  material: Material;
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
    private materialSrv: MaterialService,
    private carrinhoSrv: CarrinhoService,
    ) {
      this.idtipomaterial = Number(this.routeActiveSrv.snapshot.paramMap.get('idtipomaterial'));
      this.idMatricula = Number(this.routeActiveSrv.snapshot.paramMap.get('idMatricula'));
      this.nomeAluno = this.routeActiveSrv.snapshot.paramMap.get('nome');

    }

  ngOnInit() {

    this.routeActiveSrv.data.subscribe(data => {
      this.material             = data.material;
    });

    this.carrinhoSrv.getCarrinho().subscribe(data => {
      this.carrinho = data;
      console.log('obs',this.carrinho);
    });

    this.f = this.fbSrv.group({
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
      // if (this.f.valid && !this.formStatus) {
        this.formStatus = true;
        this.produtoCarrinho.id = this.idtipomaterial;
        this.produtoCarrinho.nome  = (this.material.descricaoVenda) ? this.material.descricaoVenda : this.material.descricao;
        this.produtoCarrinho.descricao  = this.material.descricaoVenda;
        this.produtoCarrinho.foto = this.material.imgproduto;
        this.produtoCarrinho.formasPgto = <CarrinhoFormaPgtoModel[]>this.material.planosPagamento;
        this.produtoCarrinho.idCategoriaLoja = this.material.idCategoriaLoja;
        this.produtoCarrinho.preco = this.material.precoVenda;
        this.produtoCarrinho.nomeAluno = this.nomeAluno;
        // console.log('turmas',this.f.get('turmas').value);
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
