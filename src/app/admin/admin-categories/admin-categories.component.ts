import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {Category} from '../../models/category';
import {AdminService} from '../../services/admin.service';
import {delay} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {AddCategoryModalComponent} from '../../modal-windows/add-category-modal/add-category-modal.component';
import {SnackBarService} from '../../services/snackBar.service';
import {UpdateCategoryModalComponent} from '../../modal-windows/update-category-modal/update-category-modal.component';

@Component({
  selector: 'ms-admin',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.scss']
})
export class AdminCategoriesComponent implements OnInit {
  category: Category;
  categories: Category[];
  displayedColumns: string[] = ['id', 'name', 'deleted', 'update'];

  constructor(private categoryService: CategoryService,
              private adminService: AdminService,
              public modal: MatDialog,
              private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  private getCategories(): void {
    this.categoryService.getCategoryList().subscribe(categories => {
      this.categories = categories;
    });
  }

  deleteCategory(categoryId: string) {
    this.adminService.deleteCategory(categoryId).subscribe((response: any) => {
      this.categoryService.deleteCategoryFromStorage(response.category);
      this.snackBar.showSnackBar(response.message);
      this.adminService.deleteManyDish(response.category).subscribe(message => console.log(message));
      this.getCategories();
    }, (error) => {
      console.log(error);
    });
  }

  openModalAddCategory() {
    const modalRef = this.modal.open(AddCategoryModalComponent);
    modalRef.afterClosed().subscribe(result => {
      this.getCategories();
    });
  }

  openUpdateCategory(selectedCategory: Category) {
    const modalRef = this.modal.open(UpdateCategoryModalComponent, {
      data: selectedCategory,
    });
    modalRef.afterClosed().subscribe(result => {
      this.getCategories();
    });
  }
}
