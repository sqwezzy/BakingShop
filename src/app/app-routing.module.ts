import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {SingUpComponent} from './sing-up/sing-up.component';
import {CatalogComponent} from './catalog/catalog.component';
import {CatalogWithDetailsComponent} from './catalog-with-details/catalog-with-details.component';
import {CatalogWithCategoryComponent} from './catalog-with-category/catalog-with-category.component';
import {CatalogWithoutInformationComponent} from './catalog-without-information/catalog-without-information.component';
import {AdminComponent} from './admin/admin.component';

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
      {path: ':categoryName/:id', component: CatalogWithDetailsComponent},
      ],
  },
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
