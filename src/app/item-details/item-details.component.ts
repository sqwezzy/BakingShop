import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {map, mergeMap, tap} from 'rxjs/operators';
import {Dish} from '../models/dish';
import {CategoryService} from '../services/category.service';
import {DishService} from '../services/dish.service';
import {combineLatest} from 'rxjs';
import {CartService} from '../services/cart.service';


@Component({
  selector: 'ms-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  currentId: string;
  currentDish: Dish;
  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private dishService: DishService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.currentId = params.get('id');
      this.getDish(this.currentId);
  });
  }
  getDish(id: string) {
    this.categoryService.getCategoryList().subscribe( categories =>
      this.dishService.getDishById(id, categories).subscribe(dish => this.currentDish = dish));
  }
  }
