import { Component, OnInit } from '@angular/core';
import { DishService } from '../services/dish.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category';
import { Dish } from '../models/dish';

@Component({
  selector: 'ms-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public categories: Category[];
  public dishes: Dish[];
  public filteredDishes: Dish[];

  constructor(private dishSevice: DishService,
    private categoryService: CategoryService) {
    this.dishSevice.getDishes().subscribe(dishes => { 
      this.dishes = dishes;
    });
    this.categoryService.getCategoryList().subscribe(categories => {
      this.categories = categories;
      this.categories.unshift({ id: 0, name: 'All' });
    });
  }

  ngOnInit() {
    this.filteredDishes = this.dishes;
  }

  onTabClick(event: any): void {
    this.filteredDishes = this.categories[event.index].id === 0
      ? this.dishes
      : this.dishes.filter(dish => dish.categoryId === this.categories[event.index].id);
  }
}
