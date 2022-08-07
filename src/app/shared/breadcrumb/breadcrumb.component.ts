import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
//   @Input() titulo: string;
  @Input() breadcrumbs: { nombre: string; url: string[] }[];
  constructor(private location: Location, private _router: Router) {}

  ngOnInit(): void {}
  goBack() {
    this.location.back();
  }
  redirect(item) {
    this._router.navigate(item.url);
  }
}
