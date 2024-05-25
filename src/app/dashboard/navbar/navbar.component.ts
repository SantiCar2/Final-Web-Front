import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const tab = this.route.snapshot.queryParamMap.get('tab');
    if (!tab) {
      this.changeSelectedTab('peleadores');
    }
  }

  changeSelectedTab(tab: string) {
    const queryParams = { tab: tab };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }

  isSelected(tab: string) {
    //Verifica si el tab está activo
    return this.route.snapshot.queryParamMap.get('tab') === tab;
  }

}
