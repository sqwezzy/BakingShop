import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {SingUpComponent} from './sing-up/sing-up.component';
import {CatalogComponent} from './catalog/catalog.component';
import {ItemDetailsComponent} from './item-details/item-details.component';
import {CartComponent} from './cart/cart.component';
import {ModalWindowComponent} from './modal-window/modal-window.component';




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
      },
      ],
  },
  {path: ':category/:id', component: ItemDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
