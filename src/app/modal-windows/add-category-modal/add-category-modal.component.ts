import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AdminService} from '../../services/admin.service';
import {Category} from '../../models/category';
import {FormControl, FormGroup} from '@angular/forms';
import {SnackBarService} from '../../services/snackBar.service';
import {CategoryService} from '../../services/category.service';
import {AdminCategoriesComponent} from '../../admin/admin-categories/admin-categories.component';

@Component({
  selector: 'ms-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent implements OnInit {
  category: Category;
  form: FormGroup;

  constructor(private modal: MatDialog,
              private adminService: AdminService,
              private snackBar: SnackBarService,
              private categoryService: CategoryService,
              // public modalRef: MatDialogRef<AdminCategoriesComponent>,
              // @Inject(MAT_DIALOG_DATA) public category: Category
              ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null),
      code: new FormControl(null)
    });
  }

  closeModal() {
    this.modal.closeAll();
  }

  addCategory() {
    this.adminService.addNewCategory(this.form.value).subscribe(
      (response) => {
        this.categoryService.setCategory(response.category);
        this.snackBar.showSnackBar(response.message);
        this.closeModal();
      },
      (error) => console.log(error.error));
  }
}
