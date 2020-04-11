import {Category} from '../models/category';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {SERVER_URL} from '../../environments/constant';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  categories: Category[];
  currentCategory: Category;

  constructor(private http: HttpClient) {
  }

  getCategoryList(): Observable<Category[]> {
    if (this.categories && this.categories.length > 0) {
      return of([...this.categories]);
    } else {
      this.initCategory();
      return this.http.get<Category[]>(`${SERVER_URL}categories`);
    }
  }

  private initCategory() {
    this.http.get<Category[]>(`${SERVER_URL}categories`).subscribe(categories => this.categories = categories);
  }

  getCategoryByName(categoryName: string) {
    if (this.categories && this.categories.length > 0) {
      return of(this.categories.find(category => category.name.toLowerCase() === categoryName));
    } else {
      return this.http.get<Category[]>(`${SERVER_URL}categories`).pipe(map((categories: Category[]) => {
        this.currentCategory = categories.find(category => category.name.toLowerCase() === categoryName);
        return this.currentCategory;
      }));
    }
  }

  setCategory(category: Category) {
    this.categories.push(category);
  }

  deleteCategoryFromStorage(category: Category) {
    this.categories.splice(this.categories.indexOf(category), 1);
  }

  updateCategoryStorage(currentCategory: Category) {
    const index = this.categories.findIndex(category => category.code === currentCategory.code);
    this.categories[index] = currentCategory;
  }
}
