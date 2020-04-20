import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Dish} from '../../../../models/dish';
import {CategoryService} from '../../../../services/category.service';
import {DishService} from '../../../../services/dish.service';
import {BasketService} from '../../../../services/basket.service';
import {mergeMap, tap} from 'rxjs/operators';
import {noop} from 'rxjs';
import {MatDialog} from '@angular/material';
import {InternalServerPageComponent} from '../../../../pages/error-pages/internal-server-page/internal-server-page.component';


@Component({
  selector: 'ms-dish-with-details',
  templateUrl: './dish-with-details.component.html',
  styleUrls: ['./dish-with-details.component.scss']
})
export class DishWithDetailsComponent implements OnInit {
  currentId: string;
  currentDish: Dish;
  spinner: boolean;

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private dishService: DishService,
              private cartService: BasketService,
              private modal: MatDialog) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.showSpinner();
      this.currentId = params.get('id');
      this.getDish(this.currentId);
    });
  }

  getDish(id: string) {
    this.categoryService.getCategoryList().pipe(
      mergeMap(categories => this.dishService.getDishById(id, categories)),
      tap<Dish>(dish => {
          this.currentDish = dish;
          this.hideSpinner();
        }
      )
    ).subscribe(noop, (error) => {
      if (error.status === 500) {
        this.modal.open(InternalServerPageComponent);
      }
    });
  }

  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner(): void {
    this.spinner = false;
  }
}
