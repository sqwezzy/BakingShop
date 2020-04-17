import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminCategoriesComponent} from './admin-categories/admin-categories.component';
import {AuthGuard} from '../guards/auth.guard';
import {AdminDishesComponent} from './admin-dishes/admin-dishes.component';

const routes: Routes = [
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'categories', component: AdminCategoriesComponent},
      { path: 'dishes', component: AdminDishesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
