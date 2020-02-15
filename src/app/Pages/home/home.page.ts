import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  pages = [
    {
      title: 'Principal',
      url: '/home/principal',
      icon: 'home',
      mostrar: 'ok'
    },
    {
      title: 'Ventas',
      url: '/home/ventas',
      icon: 'analytics',
      mostrar: 'ok'
    },
  ];

  constructor(
    private router: Router,
  ) {
    this.router.navigateByUrl('home/ventas');

  }

}
