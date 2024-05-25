import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environment';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, MatSnackBarModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.scss'
})
export class UsuarioComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}
  token: string = this.cookieService.get('Token');

  ngOnInit(): void {
    if (!this.token) {
      this.router.navigate(['/login']);
    }

    this.httpClient.get<any>(`${environment.api_url}/user/getUser`, {headers: {'Token': `${this.token}`} }).subscribe((response) => {
      console.log('Response: ', response);
      this.createdAt = response['CreatedAt'];
      this.updatedAt = response['UpdatedAt'];
      this.description = response['description'];
      this.username = response['username'];

      this.updateForm.patchValue({
        description: this.description,
        username: this.username,
        }
      )
    });

    this.updateForm = this.formBuilder.group({
      description: '',
      username: '',
      password: '',
    });
  }

  updateForm!: FormGroup;

  createdAt: string = '';
  updatedAt: string = '';

  description: string = '';
  username: string = '';
  password: string = '';

  deleteMe() {
    console.log('Delete me');
    this.httpClient.delete(`${environment.api_url}/user/deleteUser`, {headers: {'Token': `${this.token}`} }).subscribe(
      (response) => {
        console.log('Response: ', response);
        this.openSnackBar('Usuario eliminado correctamente');
        this.cookieService.delete('Token');
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.error('Error: ', error.status);
        this.openSnackBar('Error al eliminar usuario', 'Cerrar');
      }
    );
  }

  logout() {
    console.log('Logout');
    this.cookieService.delete('Token');
    this.router.navigate(['/login']);
  }

  updateChanges() {
    console.log('Update changes');
    const description = this.updateForm?.get('description')?.value;
    const username = this.updateForm?.get('username')?.value;
    const password = this.updateForm?.get('password')?.value;

    this.httpClient.put(`${environment.api_url}/user/updateUser`, { description, username, password }, {headers: {'Token': `${this.token}`} }).subscribe(
      (response) => {
        console.log('Response: ', response);
        this.openSnackBar('Usuario actualizado correctamente');
      },
      (error: any) => {
        console.error('Error: ', error.status);
        this.openSnackBar('Error al actualizar usuario', 'Cerrar');
      }
    );
  }

  openSnackBar(message: string, action: string = 'Cerrar') {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
