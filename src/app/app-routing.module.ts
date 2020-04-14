import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {SingUpComponent} from './sing-up/sing-up.component';
import {CatalogComponent} from './catalog/catalog.component';
import {CatalogWithCategoryComponent} from './catalog/catalog-with-category/catalog-with-category.component';
import {CatalogWithoutInformationComponent} from './catalog/catalog-without-information/catalog-without-information.component';
import {AdminCategoriesComponent} from './admin/admin-categories/admin-categories.component';
import {DishWithDetailsComponent} from './dish/dish-with-details/dish-with-details.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminDishesComponent} from './admin/admin-dishes/admin-dishes.component';
import {AccountComponent} from './account/account.component';
import {HomePageComponent} from './home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'about', component: FooterComponent },
  {path: 'account', component: AccountComponent},
  {
    path: 'login', children: [
      { path: '', component: LoginComponent },
      { path: 'singUp', component: SingUpComponent }]
  },
  {
    path: 'catalog', component: CatalogComponent, children: [
      { path: '', component: CatalogWithoutInformationComponent },
      { path: ':categoryName', component: CatalogWithCategoryComponent },
      { path: ':categoryName/:id', component: DishWithDetailsComponent },
    ],
  },
  {
    path: 'admin', canActivate: [AuthGuard], children: [
      { path: 'categories', component: AdminCategoriesComponent },
      { path: 'dishes', component: AdminDishesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
