import { CarrinhoService } from './../../shared/services/carrinho.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CarrinhoModel } from 'src/app/shared/models/carrinho/carrinho.model';
import { Observable, empty, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  profile: any;

  qtdAlterada: number;

  constructor(
    private carrinhoSrv: CarrinhoService,
    private authService: AuthService
  ) {
    this.profile = this.authService.getProfile();
  }

  ngOnInit() {


    CarrinhoService.quantidadeAlterada.subscribe(ret => {
      this.qtdAlterada = ret;
      console.log(ret);
    });
  }

  logout(e) {
    e.preventDefault();
    this.authService.logout();
  }
}
