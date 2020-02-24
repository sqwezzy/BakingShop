import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { ItemMenuComponent } from './item-menu/item-menu.component';
import { RatingComponent } from './rating/rating.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SingUpComponent } from './sing-up/sing-up.component';
import { CatalogComponent } from './catalog/catalog.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ItemDetailsComponent } from './item-details/item-details.component';
import { FilterByNamePipe } from './pipes/fiterByName.pipe';
import { CartComponent } from './cart/cart.component';
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    ItemMenuComponent,
    RatingComponent,
    FooterComponent,
    LoginComponent,
    SingUpComponent,
    CatalogComponent,
    ItemDetailsComponent,
    FilterByNamePipe,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTabsModule,
    MatCardModule,
    MatGridListModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
