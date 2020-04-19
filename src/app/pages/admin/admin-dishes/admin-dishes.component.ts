import {Component, OnInit} from '@angular/core';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category.service';
import {AdminService} from '../../../services/admin.service';
import {MatDialog} from '@angular/material';
import {SnackBarService} from '../../../services/snackBar.service';
import {DishService} from '../../../services/dish.service';
import {Dish} from '../../../models/dish';
import { mergeMap, tap} from 'rxjs/operators';
import {CreateOrUpdateDishlComponent} from '../../../shared/components/modal-windows/create-or-update-dish-modal/create-or-update-dishl.component';
import {noop} from 'rxjs';
import {InternalServerPageComponent} from '../../error-pages/internal-server-page/internal-server-page.component';

@Component({
  selector: 'ms-admin-dishes',
  templateUrl: './admin-dishes.component.html',
  styleUrls: ['./admin-dishes.component.scss'],
})
export class AdminDishesComponent implements OnInit {
  spinner: boolean;
  dishes: Dish[];
  categories: Category[];
  searchInput = '';
  displayedColumns = ['image', 'name', 'category', 'price', 'rating', 'delete', 'update'];

  constructor(private dishService: DishService,
              private adminService: AdminService,
              public modal: MatDialog,
              private snackBar: SnackBarService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.showSpinner();
    this.categoryService.getCategoryList().pipe(
      tap<Category[]>(categories => {
        this.categories = categories;
      }),
      mergeMap(categories => this.dishService.getDishes(categories)),
      tap<Dish[]>(dishes => {
        this.dishes = dishes;
        this.hideSpinner();
      })).subscribe(
      noop,
      (error) => {
        if (error.status === 500) {
          this.modal.open(InternalServerPageComponent);
          return;
        }
        this.snackBar.showSnackBar(error.error);
      }
    );
  }

  private openModalAddDish() {
    const modalRef = this.modal.open(CreateOrUpdateDishlComponent, {
      data: {
        isNew: true,
      }
    });
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.categories.findIndex(category => category._id === result.categoryId);
        result.category = this.categories[index];
        this.dishes.push(result);
        this.dishes = this.dishes.slice();
      }
    });
  }

  private openModalUpdateDish(currentDish: Dish): void {
    const modalRef = this.modal.open(CreateOrUpdateDishlComponent, {
      data: {
        dish: currentDish,
        isNew: false
      }
    });
    modalRef.afterClosed().subscribe(dish => {
      if (dish) {
        const categoryIndex = this.categories.findIndex(category => category._id === dish.categoryId);
        dish.category = this.categories[categoryIndex];
        const index = this.dishes.findIndex(updateDish => updateDish._id === dish._id);
        this.dishes.splice(index, 1, dish);
        this.dishes = this.dishes.slice();
      }
    });
  }

  deleteDish(currentId: string) {
    this.showSpinner();
    this.adminService.deleteDish(currentId).subscribe(response => {
      const index = this.dishes.findIndex(dish => dish._id === currentId);
      this.dishes.splice(index, 1);
      this.dishes = this.dishes.slice();
      this.snackBar.showSnackBar(response.message);
      this.hideSpinner();
    }, (error) => {
      if (error.status === 500) {
        this.modal.open(InternalServerPageComponent);
        return;
      }
      this.snackBar.showSnackBar(error.error);
    });
  }

  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner() {
    this.spinner = false;
  }
}
