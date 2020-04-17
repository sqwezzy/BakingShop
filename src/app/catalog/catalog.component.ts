import {Component, OnInit} from '@angular/core';
import {DishService} from '../services/dish.service';
import {CategoryService} from '../services/category.service';
import {Category} from '../models/category';
import {ActivatedRoute, Router} from '@angular/router';

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
              private router: Router) {
  }

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(categories => {
      this.categories = categories;
    }, console.error);
  }

  switchCategory(categoryName: string): void {
    this.router.navigate(['catalog', categoryName]);
  }

}
