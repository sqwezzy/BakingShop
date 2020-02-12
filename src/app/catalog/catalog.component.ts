import {Component, OnInit} from '@angular/core';
import {DishService} from '../services/dish.service';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category';
import {Dish} from '../models/dish';
import {mergeMap, tap} from 'rxjs/operators';




@Component({
  selector: 'ms-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  searchInput: string;
  categories: Category[];
  dishes: Dish[];
  dishByCategory: Dish[];
  error: any;

  constructor(private categoryService: CategoryService, private dishService: DishService) {
  }

  ngOnInit() {
    this.categoryService.getCategoryList().pipe(
      tap<Category[]>(categories => {
        this.categories = categories;
      }),
      mergeMap(categories => this.dishService.getDishes(categories)),
      tap<Dish[]>(dishes => {
        this.dishes = dishes;
      }),
    ).subscribe(result => console.log(result),
      error => console.log(error),
    );
  }

  changeCategory(category: Category) {
    this.dishByCategory = this.dishes.filter(dish => dish.category.name === category.name);
  }

}
