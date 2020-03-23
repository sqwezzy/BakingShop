import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import { Category } from '../models/category';
import {AdminService} from '../services/admin.service';
import {delay} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {AddCategoryModalComponent} from '../modal-windows/add-category-modal/add-category-modal.component';

@Component({
  selector: 'ms-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  categories: Category[];
  displayedColumns: string[] = ['id', 'name', 'deleted', 'update'];

  constructor(private categoryService: CategoryService,
              private adminService: AdminService,
              public modal: MatDialog) { }

  ngOnInit() {
    this.categoryService.getCategoryList().pipe(delay(5000)).subscribe(categories => {
    this.categories = categories;
    });
  }
  deleteCategory(categoryId: string) {
    this.adminService.removeCtegory(categoryId).subscribe(response => console.log(response));
  }

  openModalAddCategory() {
    this.modal.open(AddCategoryModalComponent);
  }
}
