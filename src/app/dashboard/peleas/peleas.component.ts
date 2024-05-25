import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environment';
import { PeleasRegisterDialogComponent } from './peleas-register-dialog/peleas-register-dialog.component';

@Component({
  selector: 'app-peleas',
  standalone: true,
  imports: [],
  templateUrl: './peleas.component.html',
  styleUrl: './peleas.component.scss'
})
export class PeleasComponent {
  dataRows = [
    {
      CreatedAt: '2021-09-01T00:00:00Z',
      ID: 1,
      content: 'Pelea deliciosa',
      winner: 7
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
      .get(`${environment.api_url}/user/getAllHistories`)
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

  openRegisterDialog(): void {
    console.log('Opening register dialog');
    this.dialog.open(PeleasRegisterDialogComponent, {
      width: '300px'
    });
  }
}
