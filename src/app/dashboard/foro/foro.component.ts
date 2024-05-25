import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environment';
import { ForoRegisterDialogComponent } from './foro-register-dialog/foro-register-dialog.component';
import { ForoEditDialogComponent } from './foro-edit-dialog/foro-edit-dialog.component';


type rows = {
  CreatedAt: string;
  ID: number;
  UpdatedAt: string;
  content: string;
  userId: number;
};

@Component({
  selector: 'app-foro',
  standalone: true,
  imports: [],
  templateUrl: './foro.component.html',
  styleUrl: './foro.component.scss'
})
export class ForoComponent {
  

  dataRows: rows[] = [
    {
      CreatedAt: '2021-09-01T00:00:00Z',
      ID: 1,
      UpdatedAt: '2021-09-01T00:00:00Z',
      content: 'Pelea deliciosa',
      userId: 7,
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
    this.cookieService.set('Token', token);

    this.httpClient
      .get(`${environment.api_url}/user/getAllPost`)
      .subscribe((response: any) => {
        this.dataRows = response as rows[];
      });
  }

  showMyFighters(event: any) {
    const isChecked: Boolean = event.checked;
    if (isChecked) {
      this.httpClient
        .get(`${environment.api_url}/user/getAllYourPost`)
        .subscribe((response: any) => {
          this.dataRows = response;
        });
    } else {
      this.httpClient
        .get(`${environment.api_url}/user/getAllPost`)
        .subscribe((response: any) => {
          this.dataRows = response;
        });
    }
  }

  openDeleteDialog(): void {
    console.log('Opening delete dialog');
    this.dialog.open(ForoEditDialogComponent, {
      width: '250px'
    });
  }

  openRegisterDialog(): void {
    console.log('Opening register dialog');
    this.dialog.open(ForoRegisterDialogComponent, {
      width: '300px'
    });
  }

  getUser(id: number) {
    var user = '';
    this.httpClient
      .get(`${environment.api_url}/user/getOtherUser/${id}`)
      .subscribe((response: any) => {
        user = response.username;
      });
    return user;
  }
}
