import {Component, OnInit} from '@angular/core';
import {DishService} from '../services/dish.service';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category';
import {Dish} from '../models/dish';
import {merge} from "rxjs";
import {mergeMap, tap} from "rxjs/operators";

@Component({
  selector: 'ms-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],

})
export class MenuComponent implements OnInit {

  public categories: Category[];
  private dishes: Dish[];
  private filteredDishes: Dish[];
  public spinner: boolean;


  constructor(private dishSevice: DishService, private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getCategoryList().pipe(
      tap(categories =>
        this.categories = categories),
      mergeMap(categories => this.dishSevice.getDishes(categories).pipe(
        tap(dishes =>
          this.dishes = dishes),
        ),
      ),
    )
  }

  onTabClick(event: any): void {
    this.filteredDishes = this.categories[event.index].id === 0
      ? this.dishes
      : this.dishes.filter(dish => dish.categoryId === this.categories[event.index].id);
  }

}
