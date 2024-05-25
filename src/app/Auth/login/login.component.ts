import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { environment } from './../../environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  loginForm!: FormGroup;
  token: string = this.cookieService.get('Token');

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      user: '',
      password: '',
    });
    if (this.token) {
      this.router.navigate(['/dashboard']);
    }
  }

  submitForm() {
    const username = this.loginForm?.get('user')?.value;
    const password = this.loginForm?.get('password')?.value;

    if (!username) {
      this.openSnackBar('Usuario o contraseña vacíos', 'Cerrar');
      return;
    }

    this.httpClient
      .post(`${environment.api_url}/login`, { username, password })
      .subscribe(
        (response) => {
          console.log('Response: ', response);
          this.openSnackBar('Login correcto');

          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          console.error('Login error: ', error);

          this.httpClient
            .post(`${environment.api_url}/createUser`, { username, password })
            .subscribe(
              (response) => {
                console.log('Response: ', response);
                this.openSnackBar('Usuario creado correctamente');
              },
              (error: any) => {
                console.error('Error: ', error.status);
                this.openSnackBar('Error al crear usuario', 'Cerrar');
              }
            );
        }
      );
  }

  openSnackBar(message: string, action: string = 'Cerrar') {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
