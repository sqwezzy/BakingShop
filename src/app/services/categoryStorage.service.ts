import {Category} from '../models/category';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CategoryStorageService {
  savedCategories: Category[];

  setCategoriesInStorage(categories: Category[]): void {
    console.log(categories);
    this.savedCategories = categories;
  }

  getSavedCategories(): Observable<Category[]> {
    return of([...this.savedCategories]);
  }

  isSavedCategories(): boolean {
    return !!this.savedCategories;
  }

  deleteCategoryFromStorage(category: Category) {
    this.savedCategories.splice(this.savedCategories.indexOf(category), 1);
  }

  getCategoryByName(categoryName: string): Observable<Category> {
    return of(this.savedCategories.find(category => category.name.toLowerCase() === categoryName));
  }

  setCategoryInStorage(category: Category): void {
    this.savedCategories.push(category);
  }

  updateCategoryStorage(currentCategory: Category): void {
    const index = this.savedCategories.findIndex(category => category._id === currentCategory._id);
    this.savedCategories[index] = currentCategory;
  }
}
