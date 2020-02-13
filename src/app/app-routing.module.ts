import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {SingUpComponent} from './sing-up/sing-up.component';
import {CatalogComponent} from './catalog/catalog.component';
import {ItemDetailsComponent} from "./item-details/item-details.component";




const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'about', component: FooterComponent},
  {path: 'login', children: [{path: '', component: LoginComponent}, {path: 'singUp', component: SingUpComponent}]},
  {
    path: 'catalog',
    children: [
      {
        path: '',
        component: CatalogComponent,
      }, {
        path : ':category',
        component: CatalogComponent,
      },
      {path: ':category/:id', component: ItemDetailsComponent}]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
