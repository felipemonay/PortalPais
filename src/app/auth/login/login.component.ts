import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  f: FormGroup;
  errorCredentials = false;
  bg: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    
  ) { }

  ngOnInit() {
    localStorage.clear();
    this.f = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
    this.randomBG();
  }

  onSubmit() {
    this.authService.login(this.f.value).subscribe(
      (resp) => {
        this.router.navigate(['admin']);
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 401) {
          this.errorCredentials = true;
        }
      }
    );
  }

  navigateTo() {
    this.router.navigate(['auth/esqueciSenha']);
  }

  randomBG(): void {
    const random = Math.floor((Math.random() * 5) + 1);
    this.bg = `http://localhost:4200/assets/img/login/${random}.jpg`;
  }
}

