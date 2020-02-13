import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map, mergeMap} from "rxjs/operators";
import {Dish} from "../models/dish";
import {CategoryService} from "../services/category.service";
import {DishService} from "../services/dish.service";
import {combineLatest} from "rxjs";




@Component({
  selector: 'ms-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  currentId: number;
  currentDish: Dish;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private dishService: DishService) {
  }

  ngOnInit() {
    let dishes$ = this.categoryService.getCategoryList().pipe(
      mergeMap(categories => this.dishService.getDishes(categories)),
    );
    let currentId$ = this.route.paramMap.pipe(map(params => {
      return params.get("id");
    }));
    combineLatest(dishes$, currentId$).subscribe(([dishes, id]) => {
      this.currentId = Number(id);
      this.currentDish = dishes.find(dish => dish.id === this.currentId)
  })}
}
