import { Component, OnInit } from '@angular/core';
import {DishService} from '../services/dish.service';
import {CategoryService} from '../services/category.service';
import { Category } from '../models/category';
import { Dish} from "../models/dish";

@Component({
  selector: 'ms-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public categories: Category[];
  public dishes: Dish[];
  public filteredDishes: Dish[];

  constructor (private dishSevice: DishService,
               private categoryService: CategoryService
  ) {
    this.dishes = this.dishSevice.getDishes();
    this.categories = this.categoryService.getCategoryList();
  }

  ngOnInit() {
  }

  onTabClick(event: any): void {
    this.filteredDishes = this.dishes.filter(dish => dish.category === this.categories[event.index - 1].name)
  }
}
