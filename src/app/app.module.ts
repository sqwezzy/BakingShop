import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule} from '@angular/material/dialog';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import {MatSelectModule} from '@angular/material/select';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './header/header.component';
import {MenuComponent} from './menu/menu.component';
import {DishComponent} from './dish/dish.component';
import {RatingComponent} from './rating/rating.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {SingUpComponent} from './sing-up/sing-up.component';
import {CatalogComponent} from './catalog/catalog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DishWithDetailsComponent} from './dish/dish-with-details/dish-with-details.component';
import {FilterByNamePipe} from './pipes/fiterByName.pipe';
import {CartComponent} from './cart/cart.component';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import { CartModalComponent } from './modal-windows/cart-modal/cart-modal.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { MapComponent } from './map/map.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { CatalogWithCategoryComponent } from './catalog/catalog-with-category/catalog-with-category.component';
import { CatalogWithoutInformationComponent } from './catalog/catalog-without-information/catalog-without-information.component';
import { AdminComponent } from './admin/admin.component';
import { AddCategoryModalComponent } from './modal-windows/add-category-modal/add-category-modal.component';
import {TokenInterceptor} from './guards/token.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    DishComponent,
    RatingComponent,
    FooterComponent,
    LoginComponent,
    SingUpComponent,
    CatalogComponent,
    DishWithDetailsComponent,
    FilterByNamePipe,
    CartComponent,
    CartModalComponent,
    MapComponent,
    CatalogWithCategoryComponent,
    CatalogWithoutInformationComponent,
    AdminComponent,
    AddCategoryModalComponent,
  ],
  entryComponents: [CartModalComponent, AddCategoryModalComponent],
  imports: [
    AngularYandexMapsModule.forRoot('null'),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTreeModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatBadgeModule,
    NgbRatingModule,
    MatDialogModule,
    MatMenuModule,
    HttpClientModule,
    MatSelectModule,
    MatTableModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
