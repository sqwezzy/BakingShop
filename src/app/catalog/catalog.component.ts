import {Component, OnInit} from '@angular/core';
import {DishService} from '../services/dish.service';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category';
import {Dish} from '../models/dish';
import {delay, map, mergeMap, tap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {combineLatest} from 'rxjs';

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

  constructor(private categoryService: CategoryService,
              private dishService: DishService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(categories => {
      this.categories = categories;
    });
  }
}
