import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Dish} from '../models/dish';
import {CategoryService} from '../services/category.service';
import {DishService} from '../services/dish.service';
import {CartStorageService} from '../services/cartStorage.service';
import {SERVER_URL} from '../../environments/constant';


@Component({
  selector: 'ms-dish-with-details',
  templateUrl: './dish-with-details.component.html',
  styleUrls: ['./dish-with-details.component.scss']
})
export class DishWithDetailsComponent implements OnInit {
  currentId: string;
  currentDish: Dish;
  SERVER_URL = SERVER_URL;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private dishService: DishService,
              private cartService: CartStorageService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.currentId = params.get('id');
      this.getDish(this.currentId);
    });
  }

  getDish(id: string) {
    this.categoryService.getCategoryList().subscribe(categories =>
      this.dishService.getDishById(id, categories).subscribe(dish => this.currentDish = dish));
  }
}
