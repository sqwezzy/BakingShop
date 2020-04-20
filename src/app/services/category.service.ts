import {Category} from '../shared/models/category';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {SERVER_URL} from '../../environments/environment';
import {CategoryStorageService} from './categoryStorage.service';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  categories: Category[];
  currentCategory: Category;

  constructor(private http: HttpClient,
              private categoryStorage: CategoryStorageService) {
  }

  getCategoryList(): Observable<Category[]> {
    if (this.categoryStorage.isSavedCategories()) {
      return this.categoryStorage.getSavedCategories();
    } else {
      this.initCategoryStorage();
      return this.http.get<Category[]>(`${SERVER_URL}categories`);
    }
  }

  getCategoryByName(categoryName: string) {
    if (this.categoryStorage.isSavedCategories()) {
      return this.categoryStorage.getCategoryByName(categoryName);
    } else {
      return this.http.get<Category[]>(`${SERVER_URL}categories`).pipe(map((categories: Category[]) => {
        this.currentCategory = categories.find(category => category.name.toLowerCase() === categoryName);
        return this.currentCategory;
      }));
    }
  }

  private initCategoryStorage(): void {
    this.http.get<Category[]>(`${SERVER_URL}categories`).pipe(
      tap<Category[]>(categories => {
        this.categoryStorage.setCategoriesInStorage(categories);
      })
    );
  }
}
