import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UsuarioComponent } from './usuario/usuario.component';
import { PeleadorComponent } from './peleador/peleador.component';
import { PeleasComponent } from './peleas/peleas.component';
import { ForoComponent } from './foro/foro.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, UsuarioComponent, PeleadorComponent, PeleasComponent, ForoComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute, private cookieService: CookieService) { }

  token: string = this.cookieService.get('Token');

  isSelected(tab: string) {
    return this.route.snapshot.queryParamMap.get('tab') === tab;
  }

  ngOnInit() {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }
}
