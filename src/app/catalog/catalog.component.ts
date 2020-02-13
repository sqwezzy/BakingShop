import {Component, OnInit} from '@angular/core';
import {DishService} from '../services/dish.service';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category';
import {Dish} from '../models/dish';
import {map, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";
import {combineLatest} from "rxjs";




@Component({
  selector: 'ms-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  searchInput: string;
  categories: Category[];
  dishesByCategory: Dish[];
  dishes: Dish[];
  category: string;
  error: any;

  constructor(private categoryService: CategoryService, private dishService: DishService, private route: ActivatedRoute  ) {
  }

  ngOnInit() {
    let dishes$ = this.categoryService.getCategoryList().pipe(
      tap<Category[]>(categories => {
        this.categories = categories;
      }),
      mergeMap(categories => this.dishService.getDishes(categories)),
      tap<Dish[]>(dishes => {
        this.dishes = dishes;
      }),
    );
    let category$ = this.route.paramMap.pipe(map(params => {
      return params.get("category");
    }));
     combineLatest(dishes$, category$).subscribe(([dishes, category]) => {
       this.category = category;
       this.dishesByCategory =  this.dishes.filter(dish => dish.category.name.toLowerCase() === this.category);
       console.log(this.dishesByCategory);
     })
  }

  changeCategory(category: Category) {
  }

}
