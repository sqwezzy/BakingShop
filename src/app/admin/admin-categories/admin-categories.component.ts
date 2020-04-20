import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../shared/models/category';
import {AdminService} from '../../services/admin.service';
import {MatDialog} from '@angular/material';
import {CreateOrUpdateCategoryComponent} from '../../shared/components/modal-windows/create-or-update-category-modal/create-or-update-category.component';
import {SnackBarService} from '../../services/snackBar.service';
import {InternalServerPageComponent} from '../../pages/error-pages/internal-server-page/internal-server-page.component';

@Component({
  selector: 'ms-admin',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  spinner: boolean;
  category: Category;
  categories: Category[];
  displayedColumns: string[] = ['id', 'name', 'deleted', 'update'];
  searchInput = '';

  constructor(private categoryService: CategoryService,
              private adminService: AdminService,
              public modal: MatDialog,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.showSpinner();
    this.categoryService.getCategoryList().subscribe(categories => {
      this.categories = categories;
      this.hideSpinner();
    }, (error) => {
      if (error.status === 500) {
        this.modal.open(InternalServerPageComponent);
        return;
      }
      this.snackBar.showSnackBar(error.error);
    });
  }

  private deleteCategory(categoryToDeleted: Category): void {
    this.showSpinner();
    this.adminService.deleteCategory(categoryToDeleted).subscribe((response) => {
      const index = this.categories.findIndex(category => category._id === response.category._id);
      this.categories.splice(index, 1);
      this.categories = this.categories.slice();
      this.snackBar.showSnackBar(response.message);
      this.adminService.deleteManyDish(response.category).subscribe(message => console.log(message),
        (error) => {
          if (error.status === 500) {
            this.modal.open(InternalServerPageComponent);
            return;
          }
          this.snackBar.showSnackBar(error.error);
        });
      this.hideSpinner();
    }, (error) => {
      if (error.status === 500) {
        this.modal.open(InternalServerPageComponent);
        return;
      }
      this.snackBar.showSnackBar(error.error);
    });
  }

  private openModalAddCategory() {
    const modalRef = this.modal.open(CreateOrUpdateCategoryComponent, {
      data: {
        isNew: true,
      }
    });
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.categories.push(result.category);
        this.categories = this.categories.slice();
      }
    });
  }

  private openUpdateCategory(selectedCategory: Category) {
    const modalRef = this.modal.open(CreateOrUpdateCategoryComponent, {
      data: {
        category: selectedCategory,
        isNew: false,
      }
    });
    modalRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.categories.findIndex(category => category._id === result._id);
        this.categories.splice(index, 1, result);
        this.categories = this.categories.slice();
      }
    });
  }

  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner() {
    this.spinner = false;
  }
}
