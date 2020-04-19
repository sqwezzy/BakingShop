import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLayoutComponent} from './admin-layout/admin-layout.component';
import {AdminCategoriesComponent} from './admin-categories/admin-categories.component';
import {AdminDishesComponent} from './admin-dishes/admin-dishes.component';
import {AuthGuard} from '../../guards/auth.guard';
import {AdminReviewsComponent} from './admin-reviews/admin-reviews.component';


const routes: Routes = [
  {path: '', canActivate: [AuthGuard], component: AdminLayoutComponent, children: [
      {path: 'categories', component: AdminCategoriesComponent},
      {path: 'dishes', component: AdminDishesComponent},
      {path: 'reviews', component: AdminReviewsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
