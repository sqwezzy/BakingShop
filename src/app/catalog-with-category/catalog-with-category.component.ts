import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {DishService} from '../services/dish.service';
import {delay, map, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Dish} from '../models/dish';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'ms-catalog-with-category',
  templateUrl: './catalog-with-category.component.html',
  styleUrls: ['./catalog-with-category.component.scss']
})
export class CatalogWithCategoryComponent implements OnInit {
  dishes: Dish[];
  currentCategory: string;
  searchInput = '';

  constructor(private categoryService: CategoryService,
              private dishService: DishService,
              private route: ActivatedRoute,
              private router: Router,
            ) {
  }

  ngOnInit() {
    const dishes$ = this.categoryService.getCategoryList().pipe(
      mergeMap(categories => this.dishService.getDishes(categories)),
      tap<Dish[]>(dishes => {
        this.dishes = dishes;
      }));
    const category$ = this.route.paramMap.pipe(map(params => {
      this.searchInput = '';
      return params.get('categoryName');
    }));
    combineLatest(dishes$, category$).subscribe(([dishes, category]) => {
      this.currentCategory = category;
      this.dishes = dishes.filter(dish => dish.category.name.toLowerCase() === this.currentCategory);
    });
   }

  showDetails(category: string, code: number) {
    this.router.navigate(['catalog', category, code]);
  }
}
