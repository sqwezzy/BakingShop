import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './pages/login/login.component';
import {SingUpComponent} from './pages/sing-up/sing-up.component';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CatalogWithCategoryComponent} from './pages/catalog/catalog-with-category/catalog-with-category.component';
import {CatalogWithoutInformationComponent} from './pages/catalog/catalog-without-information/catalog-without-information.component';
import {TokenInterceptor} from './guards/token.interceptor';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {AdminRoutingModule} from './pages/admin/admin-routing.module';
import {AdminModule} from './pages/admin/admin.module';
import {SharedModule} from './shared/shared.module';
import {ReviewsComponent} from './pages/reviews/reviews.component';
import {NotFoundPageComponent} from './pages/error-pages/not-found-page/not-found-page.component';
import {InternalServerPageComponent} from './pages/error-pages/internal-server-page/internal-server-page.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SingUpComponent,
    CatalogComponent,
    CatalogWithCategoryComponent,
    CatalogWithoutInformationComponent,
    HomePageComponent,
    ReviewsComponent,
    NotFoundPageComponent,
    InternalServerPageComponent,
  ],
  entryComponents: [
    InternalServerPageComponent],
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatListModule,
    MatDialogModule,
    MatMenuModule,
    HttpClientModule,
    MatSnackBarModule,
    AdminModule,
    AdminRoutingModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {
}
