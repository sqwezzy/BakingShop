import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {AdminCategoriesComponent} from './admin-categories/admin-categories.component';
import {AdminDishesComponent} from './admin-dishes/admin-dishes.component';
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import {AddCategoryModalComponent} from '../modal-windows/add-category-modal/add-category-modal.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UpdateCategoryModalComponent} from '../modal-windows/update-category-modal/update-category-modal.component';
import {UpdateDishModalComponent} from '../modal-windows/update-dish-modal/update-dish-modal.component';
import {AddDishModalComponent} from '../modal-windows/add-dish-modal/add-dish-modal.component';
import {RatingComponent} from '../rating/rating.component';
import {NgbRating, NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminCategoriesComponent,
    AdminDishesComponent,
    AddCategoryModalComponent,
    UpdateCategoryModalComponent,
    AddDishModalComponent,
    UpdateDishModalComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatProgressSpinnerModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    SharedModule,
  ],
  entryComponents: [
    AddCategoryModalComponent,
    UpdateCategoryModalComponent,
    AddDishModalComponent,
    UpdateDishModalComponent,
  ]
})
export class AdminModule { }
