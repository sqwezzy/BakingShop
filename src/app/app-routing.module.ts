import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {SingUpComponent} from './sing-up/sing-up.component';
import {CatalogComponent} from './catalog/catalog.component';
import {CatalogWithCategoryComponent} from './catalog/catalog-with-category/catalog-with-category.component';
import {CatalogWithoutInformationComponent} from './catalog/catalog-without-information/catalog-without-information.component';
import {AdminComponent} from './admin/admin.component';
import {DishWithDetailsComponent} from './dish/dish-with-details/dish-with-details.component';
import {AuthGuard} from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'about', component: FooterComponent},
  {path: 'login', children: [
    {path: '', component: LoginComponent},
    {path: 'singUp', component: SingUpComponent}]},
  {
    path: 'catalog', component: CatalogComponent, children: [
      {path: '', component: CatalogWithoutInformationComponent},
      {path: ':categoryName', component: CatalogWithCategoryComponent},
      {path: ':categoryName/:id', component: DishWithDetailsComponent},
      ],
  },
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
