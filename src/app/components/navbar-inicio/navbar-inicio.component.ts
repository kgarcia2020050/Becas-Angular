import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-inicio',
  templateUrl: './navbar-inicio.component.html',
  styleUrls: ['./navbar-inicio.component.css'],
})
export class NavbarInicioComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  toLogin(){
    this._router.navigate(["login"])
  }
}

