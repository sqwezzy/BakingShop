import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {SingUpComponent} from './sing-up/sing-up.component';
import {CatalogComponent} from './catalog/catalog.component';
import {CatalogWithDetailsComponent} from './catalog-with-details/catalog-with-details.component';
import {CatalogWithCategoryComponent} from './catalog-with-category/catalog-with-category.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'about', component: FooterComponent},
  {path: 'login', children: [
    {path: '', component: LoginComponent},
    {path: 'singUp', component: SingUpComponent}]},
  {
    path: 'catalog', children: [
     {path: '', component: CatalogComponent},
      {path: ':categoryName/:categoryName', redirectTo: ':categoryName', pathMatch: 'full'},
      {path: ':categoryName', component: CatalogWithCategoryComponent},
      {path: ':categoryName/:categoryName/:id', redirectTo: ':categoryName/:id', pathMatch: 'full'},
      {path: ':categoryName/:id', component: CatalogWithDetailsComponent},
      {path: ':categoryName/:categoryName/:id/:categoryName', redirectTo: ':categoryName/:id', pathMatch: 'full'},
      ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
