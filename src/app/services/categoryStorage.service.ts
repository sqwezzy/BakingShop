import {Category} from '../models/category';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CategoryStorageService {
  savedCategories: Category[];

  setCategoriesInStorage(categories: Category[]): void {
    this.savedCategories = categories;
  }

  getSavedCategories(): Observable<Category[]> {
    return of([...this.savedCategories]);
  }

  isSavedCategories(): boolean {
    return !!this.savedCategories;
  }

  getCategoryByName(categoryName: string): Observable<Category> {
    return of(this.savedCategories.find(category => category.name.toLowerCase() === categoryName));
  }
}
