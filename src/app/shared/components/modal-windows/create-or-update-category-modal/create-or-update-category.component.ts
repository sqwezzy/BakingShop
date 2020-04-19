import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AdminService} from '../../../../services/admin.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SnackBarService} from '../../../../services/snackBar.service';
import {InternalServerPageComponent} from '../../../../pages/error-pages/internal-server-page/internal-server-page.component';

@Component({
  selector: 'ms-add-category-modal',
  templateUrl: './create-or-update-category.component.html',
  styleUrls: ['./create-or-update-category.component.scss']
})
export class CreateOrUpdateCategoryComponent implements OnInit {
  form: FormGroup;
  title: string;
  action: string;
  spinner: boolean;

  constructor(private modal: MatDialog,
              private adminService: AdminService,
              private snackBar: SnackBarService,
              public modalRef: MatDialogRef<CreateOrUpdateCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {
    if (this.data.isNew) {
      this.title = 'Create category';
      this.action = 'Create';
      this.form = new FormGroup({
        name: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[A-zА-яЁё\s]*$/)]),
      });
      this.data.category = null;
    } else {
      this.title = 'Update category';
      this.action = 'Update';
      this.form = new FormGroup({
        name: new FormControl(this.data.category.name, [Validators.required, Validators.pattern(/^[A-zА-яЁё\s]*$/)]),
      });
    }
  }

  closeModal() {
    this.modal.closeAll();
  }

  createOrUpdateCategory() {
    if (this.data.isNew) {
      this.showSpinner();
      this.form.disable();
      this.adminService.addNewCategory(this.form.value).subscribe(
        (response) => {
          this.snackBar.showSnackBar(response.message);
          this.data.category = response.category;
          this.modalRef.close(this.data);
          this.hideSpinner();
        },
        (error) => {
          if (error.status === 500) {
            this.modal.open(InternalServerPageComponent);
            return;
          }
          this.snackBar.showSnackBar(error.error);
          this.form.enable();
        });
    } else {
      this.showSpinner();
      this.form.disable();
      this.adminService.updateCategory(this.data.category._id, this.form.value).subscribe(response => {
          this.snackBar.showSnackBar(response.message);
          this.modalRef.close(response.category);
          this.hideSpinner();
        },
        (error) => {
          if (error.status === 500) {
            this.modal.open(InternalServerPageComponent);
            return;
          }
          this.snackBar.showSnackBar(error.error);
          this.form.enable();
        });
    }
  }
  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner() {
    this.spinner = false;
  }
}
