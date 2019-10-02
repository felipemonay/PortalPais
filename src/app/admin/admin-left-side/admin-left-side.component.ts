import { AdminLeftSideService } from './admin-left-side.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, empty } from 'rxjs';
import { AdminLeftSide } from './admin-left-side.model';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-left-side',
  templateUrl: './admin-left-side.component.html',
  styleUrls: ['./admin-left-side.component.css']
})
export class AdminLeftSideComponent implements OnInit {

  menu: any;
  alunos$: Observable<AdminLeftSide[]>;

  constructor(
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
    private adminLeftSideSrv: AdminLeftSideService
  ) { }

  ngOnInit() {
    this.alunos$ = this.adminLeftSideSrv.get().pipe(
      // map(),
      // tap(console.log),
      // switchMap(),
      catchError(error => {
        console.error(error);
        // this.error$.next(true);
        // alert('erro');
        return empty();
        })
      );
      // console.log('alunos', this.alunos$);
      // console.log(this.alunos$);
    }

    onSubmit(proximaRota: string) {
      this.navigateTo(proximaRota);
    }
  
    navigateTo(route: string, parm: any = '') {
      // console.log(parm);
      this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
      // this.routerSrv.navigate([route], { relativeTo: this.routeActiveSrv});
    }
  }