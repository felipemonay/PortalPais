import { ProfileService } from './admin-profile.service';
import { Component, OnInit } from '@angular/core';
import { FileManager } from 'src/app/shared/components/input-file/input-file.component';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {

  changePasswordForm: FormGroup;
  imagemForm: FormGroup;

  constructor(
    private fbSrv: FormBuilder,
    private profileSrv: ProfileService,
    private toastrSrv: ToastrService,
    private routeActiveSrv: ActivatedRoute,
    private routerSrv: Router,
  ) { }

  ngOnInit() {
    this.changePasswordForm = this.fbSrv.group({
      oldPassword:          [null, [Validators.required]],
      newPassword:          [null, [Validators.required]],
      confirmaPassword:     [null, [Validators.required, this.passwordMatch]]
    });

    this.imagemForm = this.fbSrv.group({
      urlFoto:                [null, Validators.required]
    });
  }

  passwordMatch(control: AbstractControl) {
    let paswd = control.root.get('newPassword');
    if (paswd && control.value !== paswd.value) {
     return {
        passwordMatch: false
     };
    }
    return null;
  }

  selectedFile(file: FileManager): void {
    if (file.name) {
      this.imagemForm.get('urlFoto').setValue(file.base64Data);
    } else {
      this.imagemForm.get('urlFoto').setValue(null);
    }
  }

  onSubmitSenha() {
    if (this.changePasswordForm.valid) {
      console.log('Change password form valid');
      this.profileSrv.saveSenha(this.changePasswordForm.value).subscribe(
        success => {
          this.toastrSrv.success('', 'Senha atualizada com sucesso!', {timeOut: 1000});
        }
      );
    } else {
      this.mostraErrosForm(this.changePasswordForm);
    }
  }

  onSubmitImagem() {
    if (this.imagemForm.valid) {
      this.profileSrv.saveImagem(this.imagemForm.value).subscribe(
        success => {
          this.toastrSrv.success('', 'Dados Gravados com sucesso!', {timeOut: 1000});
          // this.navigateTo('/admin/matricula/planoPagamento', {idMatricula: this.idMatricula});
        }
      );
    } else {
      this.mostraErrosForm(this.imagemForm);
    }
  }

  mostraErrosForm(formGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const control = formGroup.get(campo);
      if (control instanceof FormControl) {
        if (control.invalid) {
          this.toastrSrv.warning(`O campo ${campo} deve ser prenchido` , 'Existem campos incompletos', {timeOut: 3000});
        }
      } else if (control instanceof FormGroup) {
        this.mostraErrosForm(control);
      }
    });
  }

  navigateTo(route: string, parm: any = '') {
    this.routerSrv.navigate([route, parm], { relativeTo: this.routeActiveSrv});
  }

}
