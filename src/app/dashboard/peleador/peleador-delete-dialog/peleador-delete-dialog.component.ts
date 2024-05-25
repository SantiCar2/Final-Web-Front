import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../environment';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-peleador-delete-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './peleador-delete-dialog.component.html',
  styleUrl: './peleador-delete-dialog.component.scss',
})
export class PeleadorDeleteDialogComponent implements OnInit {
  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PeleadorDeleteDialogComponent>
  ) {}
  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: '',
    });
  }

  deleteFighter() {
    const id = this.form.get('id')?.value;

    this.httpClient
      .delete(`${environment.api_url}/user/deleteFighter/${id}`)
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
