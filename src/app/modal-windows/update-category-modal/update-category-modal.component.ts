import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AdminService} from '../../services/admin.service';
import {SnackBarService} from '../../services/snackBar.service';
import {CategoryService} from '../../services/category.service';
import {AdminCategoriesComponent} from '../../admin/admin-categories/admin-categories.component';
import {Category} from '../../models/category';

@Component({
  selector: 'ms-update-category-modal',
  templateUrl: './update-category-modal.component.html',
  styleUrls: ['./update-category-modal.component.scss']
})
export class UpdateCategoryModalComponent implements OnInit {
  form: FormGroup;

  constructor(private modal: MatDialog,
              private adminService: AdminService,
              private snackBar: SnackBarService,
              private categoryService: CategoryService,
              public modalRef: MatDialogRef<AdminCategoriesComponent>,
              @Inject(MAT_DIALOG_DATA) public category: Category) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(this.category.name, [Validators.required, Validators.pattern(/^[A-zА-яЁё\s]*$/)]),
      code: new FormControl(this.category.code, [Validators.required])
    });
  }

  private closeModal() {
    this.modal.closeAll();
  }

  private updateCurrentCategory() {
    this.adminService.updateCategory(this.category._id, this.form.value).subscribe(response => {
        this.snackBar.showSnackBar(response.message);
        this.categoryService.updateCategoryStorage(response.category);
        this.modalRef.close(response.category);
      },
      (error) => {
        this.snackBar.showSnackBar(error.error);
      });
  }

}
