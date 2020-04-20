import {Component, OnInit} from '@angular/core';
import {DishService} from '../../services/dish.service';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../shared/models/category';
import {ActivatedRoute, Router} from '@angular/router';
import {InternalServerPageComponent} from '../error-pages/internal-server-page/internal-server-page.component';
import {MatDialog} from '@angular/material';
import {SnackBarService} from '../../services/snackBar.service';

@Component({
  selector: 'ms-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  categories: Category[];
  category: string;

  constructor(private categoryService: CategoryService,
              private dishService: DishService,
              private route: ActivatedRoute,
              private router: Router,
              private modal: MatDialog,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(categories => {
      this.categories = categories;
    }, (error) => {
      if (error.status === 500) {
        this.modal.open(InternalServerPageComponent);
        return;
      }
      this.snackBar.showSnackBar(error.error);
    });
  }

  switchCategory(categoryName: string): void {
    this.router.navigate(['catalog', categoryName]);
  }

}
