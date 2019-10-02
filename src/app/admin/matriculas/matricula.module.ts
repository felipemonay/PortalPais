import { ModalConfirmaCpfComponent } from './modal/confirmaCpf/modal-confirma-cpf.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule} from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataTablesModule } from 'angular-datatables';

import { MatriculaComponent } from './matricula.component';
import { MatriculaRoutingModule } from './matricula-routing.module';
import { AlunoComponent } from './matricula-aluno/aluno.component';
import { FiliacaoComponent } from './matricula-filiacao/filiacao.component';
import { RespFinComponent } from './matricula-resp-fin/resp-fin.component';
import { RespPedComponent } from './matricula-resp-ped/resp-ped.component';
import { FichaSaudeComponent } from './matricula-ficha-saude/ficha-saude.component';
import { EtapaComponent } from './matricula-etapa/etapa.component';
import { DocumentosComponent } from './matricula-documento/documentos.component';
import { ContratoComponent } from './matricula-contrato/contrato.component';
import { FichaSaidaComponent } from './matricula-ficha-saida/ficha-saida.component';
import { PlanoPagComponent } from './matricula-plano-pag/plano-pag.component';
import { PesquisaRematriculaComponent } from './pesquisa-rematricula/pesquisa-rematricula.component';
import { NovaMatriculaComponent } from './pesquisa-rematricula/nova-matricula/nova-matricula.component';
import { ModalRematriculaComponent } from './matricula-aluno/modal-rematricula/modal-rematricula.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmaRespModalComponent } from './matricula-filiacao/confirma-resp-modal/confirma-resp-modal.component';

@NgModule({
    imports: [
        NgxMaskModule.forRoot(),
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        MatriculaRoutingModule,
        SharedModule,
        DataTablesModule,
        NgbModule
    ],
    declarations: [
        MatriculaComponent,
        AlunoComponent,
        FichaSaidaComponent,
        ContratoComponent,
        DocumentosComponent,
        EtapaComponent,
        FichaSaudeComponent,
        FiliacaoComponent,
        PlanoPagComponent,
        RespFinComponent,
        RespPedComponent,
        PesquisaRematriculaComponent,
        NovaMatriculaComponent,
        ModalRematriculaComponent,
        ConfirmaRespModalComponent,
        ModalConfirmaCpfComponent
    ],
    exports: [MatriculaComponent],
    entryComponents: [ModalRematriculaComponent, ConfirmaRespModalComponent, ModalConfirmaCpfComponent]
})

export class MatriculaModule {}
