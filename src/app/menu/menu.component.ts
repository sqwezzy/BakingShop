import {Component, OnInit, OnDestroy} from '@angular/core';
import {DishService} from '../services/dish.service';
import {CategoryService} from '../services/category.service';
import {Category} from '../Models/category';
import {Dish} from '../models/dish';
import {merge} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";

@Component({
  selector: 'ms-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],

})
export class MenuComponent implements OnInit, OnDestroy {

  private categories: Category[];
  private dishes: Dish[];
  private filteredDishes: Dish[];
  private allCategory = {
    id: 0,
    name: 'All',
  };
  public spinner: boolean;


  constructor(private dishSevice: DishService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.showSpinner();
    this.categoryService.getCategoryList().pipe(
      tap<Category[]>(categories => {
        this.categories = categories;
        categories.unshift(this.allCategory);
      }),
      mergeMap(categories => this.dishSevice.getDishes(categories)),
      tap<Dish[]>(dishes => {
        this.dishes = dishes;
        this.filteredDishes = this.dishes;
        this.hideSpinner();
      }),
    ).subscribe();
  }

  ngOnDestroy() {
    this.categories = [];
    console.log(this.categories)
  }

  onTabClick(event: any): void {
    this.filteredDishes = this.categories[event.index].id === 0
      ? this.dishes
      : this.dishes.filter(dish => dish.categoryId === this.categories[event.index].id);
  }

  showSpinner(): void {
    this.spinner = true;
  }

  hideSpinner(): void {
    this.spinner = false;
  }
}
