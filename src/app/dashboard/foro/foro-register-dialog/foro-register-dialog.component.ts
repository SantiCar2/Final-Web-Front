import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environment';
import { PeleadorRegisterDialogComponent } from '../../peleador/peleador-register-dialog/peleador-register-dialog.component';

@Component({
  selector: 'app-foro-register-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './foro-register-dialog.component.html',
  styleUrl: './foro-register-dialog.component.scss'
})
export class ForoRegisterDialogComponent {
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PeleadorRegisterDialogComponent>
  ) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      message: '',
    });
  }

  registerPost() {
    const body = {
      content: this.form.get('message')?.value,
    };

    this.httpClient
      .post(`${environment.api_url}/user/createPost`, body)
      .subscribe(
        (response) => {
          console.log('Response: ', response);
          this.openSnackBar('Post creado');
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Delete error: ', error);
          this.openSnackBar('Error al crear post');
          this.dialogRef.close();
        }
      );
  }

  openSnackBar(message: string, action: string = 'Cerrar') {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
