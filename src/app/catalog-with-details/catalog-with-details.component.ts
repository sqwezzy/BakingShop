import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {DishService} from '../services/dish.service';
import {Category} from '../models/category';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ms-catalog-with-details',
  templateUrl: './catalog-with-details.component.html',
  styleUrls: ['./catalog-with-details.component.scss']
})
export class CatalogWithDetailsComponent implements OnInit {
  categorise: Category[];

  constructor(private categoryService: CategoryService,
              private dishService: DishService) { }

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(categories => {
      this.categorise = categories;
    });
  }

}
