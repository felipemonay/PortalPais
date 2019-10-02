import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminLeftSideComponent } from './admin-left-side/admin-left-side.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminContentComponent } from './admin-content/admin-content.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';
import { AdminDashboard2Component } from './admin-dashboard2/admin-dashboard2.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminHomeComponent } from './admin-home/chamada/admin-home.component';
import { SharedModule } from '../shared/shared.module';
import { BoletosModule } from './boletos/boletos.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ListaProdutosComponent } from './produtos/lista-produtos/lista-produtos.component';
import { HistoricoComprasComponent } from './historico-compras/historico-compras.component';
import { BlacklistComponent } from './admin-home/chamada/blacklist/blacklist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BoletosModule,
    ProdutosModule,
    SharedModule,
    NgxMaskModule.forRoot(),
    HttpClientModule, // Import Http Client
    BlockUIModule.forRoot(), // Import BlockUIModule
    BlockUIHttpModule.forRoot(), // Import Block UI Http Module
    NgbModule
  ],
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminLeftSideComponent,
    AdminContentComponent,
    AdminFooterComponent,
    AdminHomeComponent,
    AdminDashboard2Component,
    AdminProfileComponent,
    HistoricoComprasComponent,
    BlacklistComponent,
  ],
  exports: [AdminComponent],
  entryComponents: [BlacklistComponent]
})
export class AdminModule { }
