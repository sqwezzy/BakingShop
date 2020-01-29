import { Component, OnInit } from '@angular/core';
import {DishService} from '../services/dish.service';
import {CategoryService} from '../services/category.service';

@Component({
  selector: 'ms-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public categoriesList = CategoryService.prototype.getCategoryList();
  public productList = DishService.prototype.getItemMenu();

  ngOnInit() {
  }

}
