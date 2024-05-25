import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-peleador-register-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './peleador-register-dialog.component.html',
  styleUrl: './peleador-register-dialog.component.scss'
})
export class PeleadorRegisterDialogComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PeleadorRegisterDialogComponent>
  ) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      age: '',
      name: '',
      strength: '',
      height: '',
      weight: '',
      agility: '',
      luck: '',
    });
  }

  registerFighter() {
    const body = {
      name: this.form.get('name')?.value,
      age: this.form.get('age')?.value,
      stats: {
        strength: this.form.get('strength')?.value,
        height: this.form.get('height')?.value,
        weight: this.form.get('weight')?.value,
        agility: this.form.get('agility')?.value,
        luck: this.form.get('luck')?.value,
      },
    };

    this.httpClient
      .post(`${environment.api_url}/user/createFighter`, body)
      .subscribe(
        (response) => {
          console.log('Response: ', response);
          this.openSnackBar('Peleador creado');
          this.dialogRef.close();
        },
        (error: any) => {
          console.error('Delete error: ', error);
          this.openSnackBar('Error al crear peleador');
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
