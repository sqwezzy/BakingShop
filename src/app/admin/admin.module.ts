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
import {CareteOrUpdateCategoryComponent} from '../modal-windows/create-or-update-category-modal/carete-or-update-category.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CreateOrUpdateDishlComponent} from '../modal-windows/create-or-update-dish-modal/create-or-update-dishl.component';
import {SharedModule} from '../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';


@NgModule({
  declarations: [
    AdminLayoutComponent,
    AdminCategoriesComponent,
    AdminDishesComponent,
    CareteOrUpdateCategoryComponent,
    CreateOrUpdateDishlComponent,
    AdminReviewsComponent,
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
    TranslateModule,
    FormsModule,
  ],
  entryComponents: [
    CareteOrUpdateCategoryComponent,
    CreateOrUpdateDishlComponent,
  ]
})
export class AdminModule { }
