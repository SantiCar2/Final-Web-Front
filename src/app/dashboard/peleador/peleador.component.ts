import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environment';
import { MatDialog } from '@angular/material/dialog';
import { PeleadorRegisterDialogComponent } from './peleador-register-dialog/peleador-register-dialog.component';
import { PeleadorDeleteDialogComponent } from './peleador-delete-dialog/peleador-delete-dialog.component';

@Component({
  selector: 'app-peleador',
  standalone: true,
  imports: [],
  templateUrl: './peleador.component.html',
  styleUrl: './peleador.component.scss',
})
export class PeleadorComponent implements OnInit {
  dataRows = [
    {
      CreatedAt: '2021-09-01T00:00:00Z',
      ID: 1,
      name: 'Peleador 1',
      age: 25,
      stats: {
        strength: 10,
        height: 1.75,
        weight: 70,
        agility: 5,
        luck: 3,
      },
    },
  ];

  constructor(
    private router: Router,
    private cookieService: CookieService,
    private httpClient: HttpClient,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('Token');
    if (!token) {
      this.router.navigate(['/login']);
    }

    this.httpClient
      .get(`${environment.api_url}/user/getAllFighters`)
      .subscribe((response: any) => {
        this.dataRows = response;
      });
  }

  showMyFighters(event: any) {
    const isChecked: Boolean = event.checked;
    console.log(`${environment.api_url}/user/getYourFighters`);
    if (isChecked) {
      this.httpClient
        .get(`${environment.api_url}/user/getYourFighters`)
        .subscribe((response: any) => {
          this.dataRows = response;
        });
    } else {
      this.httpClient
        .get(`${environment.api_url}/user/getAllFighters`)
        .subscribe((response: any) => {
          this.dataRows = response;
        });
    }
  }

  openDeleteDialog(): void {
    console.log('Opening delete dialog');
    this.dialog.open(PeleadorDeleteDialogComponent, {
      width: '250px'
    });
  }

  openRegisterDialog(): void {
    console.log('Opening register dialog');
    this.dialog.open(PeleadorRegisterDialogComponent, {
      width: '300px'
    });
  }
}
