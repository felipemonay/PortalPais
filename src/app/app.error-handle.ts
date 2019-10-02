import { LogService } from './shared/services/log.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, Injector } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { error } from '@angular/compiler/src/util';

@Injectable()
export class AplicationErrorHandle extends ErrorHandler {

    constructor(
        private injector: Injector
    ) {
        super();
    }
   // Need to get ToastrService from injector rather than constructor injection to avoid cyclic dependency error
   private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }
   private get logService(): LogService {
        return this.injector.get(LogService);
    }
    public handleError(errorResponse: any) {

      const err = (!(errorResponse instanceof HttpErrorResponse)) ? errorResponse.rejection : errorResponse;

        // console.log('Chamou erro', errorResponse);
        // console.log('parse', (errorResponse));
        if (err instanceof HttpErrorResponse) {
          console.log('status erro', err.status);

            if (err.status === 400 &&
               (err.error.error === 'token_expired' || err.error.error === 'token_invalid' ||
                err.error.error === 'A token is required' || err.error.error === 'token_not_provided')) {
                  this.toastrService.error('', 'Sua sessão Expirou!');
                  this.goToLogin();
            }

            if (err.status === 401 && err.error.error === 'token_has_been_blacklisted') {
              this.goToLogin();
            }

            if (err.status === 404 && err.error.error === 'user_not_found') {
              this.toastrService.error('', 'Sua sessão Expirou!');
              this.goToLogin();
            }

            if (err.status === 500) {
                console.log('Erro 500', err);
                this.logService.log('geral', 'erro 500', '', err);
                this.toastrService.error(
                  'Por gentileza tente novamente mais tarde',
                  'Sistema temporariamente indisponivel!'
                ).onTap.pipe(take(1));
            }
        }
        super.handleError(errorResponse);
    }

    goToLogin(): void {
        const router = this.injector.get(Router);
        localStorage.clear();
        router.navigate(['/']);
    }

    trataErro(err: HttpErrorResponse) {
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
                this.toastrService.error(errorMessage, '', config).onTap.pipe(take(1));
              });
            } else {
              this.toastrService.error(arrKeyErros, '').onTap.pipe(take(1));
            }
          });
        } catch (error) {
          console.log('Erro Não tratado handle', error);
          this.toastrService.error('Ocorreu um erro inesperado!!!', '').onTap.pipe(take(1));
        }
    }

}
