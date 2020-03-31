import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {AdminService} from '../../services/admin.service';
import {Category} from '../../models/category';

import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'ms-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent implements OnInit {
  category: Category;
  form: FormGroup;

  constructor(public modal: MatDialog,
              private adminService: AdminService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null),
      code: new FormControl(null)
    });
    this.category = {
      name: this.form.value.name,
      code: this.form.value.code,
    };
  }

  closeModal() {
    this.modal.closeAll();
  }

  addCategory() {
    this.adminService.addNewCategory(this.category).subscribe(
      (message) => console.log(message),
      (error) => console.log(error));
  }
}
