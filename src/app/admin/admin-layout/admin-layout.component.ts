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

  private goToAdminDish(): void {
    this.router.navigate(['admin/dishes']);
  }

  private goToAdminCategories(): void {
    this.router.navigate(['admin/categories']);
  }

  private goToReviews(): void {
    this.router.navigate(['admin/reviews']);
  }
}
