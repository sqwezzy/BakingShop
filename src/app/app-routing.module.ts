import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FooterComponent} from './shared/components/footer/footer.component';
import {LoginComponent} from './pages/login/login.component';
import {SingUpComponent} from './sing-up/sing-up.component';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {CatalogWithCategoryComponent} from './pages/catalog/catalog-with-category/catalog-with-category.component';
import {CatalogWithoutInformationComponent} from './pages/catalog/catalog-without-information/catalog-without-information.component';
import {AdminCategoriesComponent} from './pages/admin/admin-categories/admin-categories.component';
import {DishWithDetailsComponent} from './shared/components/dish/dish-with-details/dish-with-details.component';
import {AuthGuard} from './guards/auth.guard';
import {AdminDishesComponent} from './pages/admin/admin-dishes/admin-dishes.component';
import {AccountComponent} from './shared/components/account/account.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminLayoutComponent} from './pages/admin/admin-layout/admin-layout.component';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {NotFoundPageComponent} from './pages/error-pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'reviews', component: ReviewsComponent},
  {path: 'account', component: AccountComponent},
  {
    path: 'login', children: [
      {path: '', component: LoginComponent},
      {path: 'singUp', component: SingUpComponent}]
  },
  {
    path: 'catalog', component: CatalogComponent, children: [
      {path: '', component: CatalogWithoutInformationComponent},
      {path: ':categoryName', component: CatalogWithCategoryComponent},
      {path: ':categoryName/:id', component: DishWithDetailsComponent},
    ]
  },
  {
    path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**', component: NotFoundPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
