import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environment';

@Component({
  selector: 'app-peleas-register-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './peleas-register-dialog.component.html',
  styleUrl: './peleas-register-dialog.component.scss',
})
export class PeleasRegisterDialogComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PeleasRegisterDialogComponent>
  ) {}

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      fighter1: '',
      fighter2: '',
      content: '',
      winner: '',
    });
  }

  registerFight() {
    const fighter1 = this.form.get('fighter1')?.value;
    const fighter2 = this.form.get('fighter2')?.value;
    const body = {
      content: this.form.get('content')?.value,
      winner: this.form.get('winner')?.value,
    };

    this.httpClient
      .post(`${environment.api_url}/user/createHistory/${fighter1}/${fighter2}`, body)
      .subscribe(
        (response) => {
          console.log('Response: ', response);
          this.openSnackBar('Pelea creada');
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Error: ', error);
          this.openSnackBar('Error al crear pelea');
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
