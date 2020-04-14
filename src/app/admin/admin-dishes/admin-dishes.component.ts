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
import {UpdateDishModalComponent} from '../../modal-windows/update-dish-modal/update-dish-modal.component';

@Component({
  selector: 'ms-admin-dishes',
  templateUrl: './admin-dishes.component.html',
  styleUrls: ['./admin-dishes.component.scss'],
})
export class AdminDishesComponent implements OnInit {
  SERVER_URL = SERVER_URL;
  dishes: Dish[];
  categories: Category[];
  displayedColumns = ['image', 'name', 'category', 'price', 'rating', 'delete', 'update'];

  constructor(private dishService: DishService,
              private adminService: AdminService,
              public modal: MatDialog,
              private snackBar: SnackBarService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.categoryService.getCategoryList().pipe(
      tap<Category[]>(categories => {
        this.categories = categories;
      }),
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
    const modalRef = this.modal.open(AddDishModalComponent);
    modalRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        const index = this.categories.findIndex(category => category.code === result.categoryCode);
        result.category = this.categories[index];
        this.dishes.push(result);
        this.dishes = this.dishes.slice();
      }
    });
  }

  private openModalUpdateDish(currentDish: Dish) {
    const modalRef = this.modal.open(UpdateDishModalComponent, {
      data: currentDish,
    });
    modalRef.afterClosed().subscribe(dish => {
      if (dish !== undefined) {
        const categoryIndex = this.categories.findIndex(category => category.code === dish.categoryCode);
        dish.category = this.categories[categoryIndex];
        const index = this.dishes.findIndex(updateDish => updateDish._id === dish._id);
        this.dishes.splice(index, 1, dish);
        this.dishes = this.dishes.slice();
      }
      });
  }

  deleteDish(currentId: string) {
    this.adminService.deleteDish(currentId).subscribe(response => {
      const index = this.dishes.findIndex(dish => dish._id === currentId);
      this.dishes.splice(index, 1);
      this.dishes = this.dishes.slice();
      this.snackBar.showSnackBar(response.message);
    });
  }
}
