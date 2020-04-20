import {Component, OnInit} from '@angular/core';
import {DishService} from '../../../services/dish.service';
import {CategoryService} from '../../../services/category.service';
import {Category} from '../../models/category';
import {Dish} from '../../models/dish';
import {mergeMap, tap} from 'rxjs/operators';
import {noop} from 'rxjs';
import {InternalServerPageComponent} from '../../../pages/error-pages/internal-server-page/internal-server-page.component';
import {MatDialog} from '@angular/material';
import {SnackBarService} from '../../../services/snackBar.service';

@Component({
  selector: 'ms-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  private categories: Category[];
  private dishes: Dish[];
  private filteredDishes: Dish[];
  private allCategory = {
    _id: '0',
    code: 0,
    name: 'All',
  };
  private spinner: boolean;

  constructor(private dishService: DishService,
              private categoryService: CategoryService,
              private modal: MatDialog,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.showSpinner();
    this.categoryService.getCategoryList().pipe(
      tap<Category[]>(categories => {
        this.categories = categories;
        this.categories.unshift(this.allCategory);
      }),
      mergeMap(categories => this.dishService.getDishes(categories)),
      tap<Dish[]>(dishes => {
        this.dishes = dishes;
        this.filteredDishes = this.dishes;
        this.hideSpinner();
      }),
    ).subscribe(
      noop,
      (error) => {
        if (error.status === 500) {
          this.modal.open(InternalServerPageComponent);
          return;
        }
        this.snackBar.showSnackBar(error.error);
      });
  }

  onTabClick(event: any): void {
    this.filteredDishes = this.categories[event.index]._id === '0'
      ? this.dishes
      : this.dishes.filter(dish => dish.categoryId === this.categories[event.index]._id);
  }

  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner(): void {
    this.spinner = false;
  }
}
