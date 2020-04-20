import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RatingComponent} from './components/rating/rating.component';
import {NgbRating} from '@ng-bootstrap/ng-bootstrap';
import {FilterByNamePipe} from '../pipes/fiterByName.pipe';
import {FilterByNameCategoryPipe} from '../pipes/filterByNameCategory.pipe';
import {AccountComponent} from './components/account/account.component';
import {
  MatBadgeModule,
  MatButtonModule,
  MatCardModule, MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatTabsModule
} from '@angular/material';
import {BasketComponent} from './components/basket/basket.component';
import {BasketModalComponent} from './components/modal-windows/basket-modal/basket-modal.component';
import {FeedbackComponent} from './components/feedback/feedback.component';
import {TranslateModule} from '@ngx-translate/core';
import {ReactiveFormsModule} from '@angular/forms';
import {DishComponent} from './components/dish/dish.component';
import {DishWithDetailsComponent} from './components/dish/dish-with-details/dish-with-details.component';
import {FooterComponent} from './components/footer/footer.component';
import {MapComponent} from './components/map/map.component';
import {AgmCoreModule} from '@agm/core';
import {MenuComponent} from './components/menu/menu.component';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {CheckoutComponent} from './components/modal-windows/checkout/checkout.component';
import {SuccessfulCheckoutModalComponent} from './components/modal-windows/successful-checkout-modal/successful-checkout-modal.component';
import {CreateOrUpdateCategoryComponent} from './components/modal-windows/create-or-update-category-modal/create-or-update-category.component';
import {CreateOrUpdateDishlComponent} from './components/modal-windows/create-or-update-dish-modal/create-or-update-dishl.component';


@NgModule({
  declarations: [
    RatingComponent,
    NgbRating,
    FilterByNamePipe,
    FilterByNameCategoryPipe,
    AccountComponent,
    BasketComponent,
    BasketModalComponent,
    FeedbackComponent,
    DishComponent,
    DishWithDetailsComponent,
    FooterComponent,
    MapComponent,
    MenuComponent,
    HeaderComponent,
    CheckoutComponent,
    SuccessfulCheckoutModalComponent,
    CreateOrUpdateCategoryComponent,
    CreateOrUpdateDishlComponent,
  ],
  entryComponents: [
    AccountComponent,
    BasketModalComponent,
    CheckoutComponent,
    SuccessfulCheckoutModalComponent,
    CreateOrUpdateCategoryComponent,
    CreateOrUpdateDishlComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    TranslateModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD3mA2IecKAZyj-yh3lZF7OiO_60M3UPLA'
    }),
    MatTabsModule,
    MatSelectModule,
    MatBadgeModule,
    MatIconModule,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    MapComponent,
    FooterComponent,
    DishWithDetailsComponent,
    DishComponent,
    FeedbackComponent,
    RatingComponent,
    NgbRating,
    FilterByNamePipe,
    FilterByNameCategoryPipe,
  ]
})
export class SharedModule {
}
