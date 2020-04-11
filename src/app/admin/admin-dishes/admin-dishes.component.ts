import {Component, OnInit} from '@angular/core';
import {Category} from '../../models/category';
import {CategoryService} from '../../services/category.service';
import {AdminService} from '../../services/admin.service';
import {MatDialog} from '@angular/material';
import {SnackBarService} from '../../services/snackBar.service';
import {DishService} from '../../services/dish.service';
import {Dish} from '../../models/dish';
import {mergeMap, tap} from 'rxjs/operators';
import {SERVER_URL} from '../../../environments/constant';
import {AddDishModalComponent} from '../../modal-windows/add-dish-modal/add-dish-modal.component';

@Component({
  selector: 'ms-admin-dishes',
  templateUrl: './admin-dishes.component.html',
  styleUrls: ['./admin-dishes.component.scss'],
})
export class AdminDishesComponent implements OnInit {
  SERVER_URL = SERVER_URL;
  dishes: Dish[];
  displayedColumns = ['image', 'name', 'category', 'price', 'rating', 'delete', 'update'];

  constructor(private dishService: DishService,
              private adminService: AdminService,
              public modal: MatDialog,
              private snackBar: SnackBarService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getCategoryList().pipe(
      mergeMap(categories => this.dishService.getDishes(categories)),
      tap<Dish[]>(dishes => {
        this.dishes = dishes;
      })).subscribe(
      () => {
      },
      (error) => console.log(error)
    );
  }

  private openModalAddDish() {
    this.modal.open(AddDishModalComponent);
  }
}
