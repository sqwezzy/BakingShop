import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ms-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }


  goToAdminDish(): void {
    this.router.navigate(['admin/dishes']);
  }

  goToAdminCategories(): void {
    this.router.navigate(['admin/categories']);
  }
}
