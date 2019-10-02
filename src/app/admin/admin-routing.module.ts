
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { AdminComponent } from './admin.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { BoletosComponent } from './boletos/boletos.component';
import { BoletosResolver } from './boletos/boletos.resolver';
import { AdminHomeComponent } from './admin-home/chamada/admin-home.component';
import { CarrinhoComponent } from './produtos/carrinho/carrinho.component';
import { HistoricoComprasComponent } from './historico-compras/historico-compras.component';
import { HistoricoComprasResolver } from './historico-compras/historico-compras.resolver';

const routesAdmin: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '',           redirectTo: 'home', pathMatch: 'full' },
      { path: 'home',       component: AdminHomeComponent },
      { path: 'home/:TipoCurso',       component: AdminHomeComponent },
      { path: 'profile',    component: AdminProfileComponent },
      { path: 'matricula',  loadChildren: './matriculas/matricula.module#MatriculaModule'},
      { path: 'produtos',   loadChildren: './produtos/produtos.module#ProdutosModule'},
      { path: 'boletos',
        component: BoletosComponent,
        resolve: {
          boletos: BoletosResolver,
        }
      },
      { path: 'historicoCompras',
        component: HistoricoComprasComponent,
        resolve: {
          historicoCompras: HistoricoComprasResolver,
        }
      },
      { path: 'carrinho', component: CarrinhoComponent },
      { path: 'perfil', component: AdminProfileComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
