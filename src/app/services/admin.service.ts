import {Injectable} from '@angular/core';
import {Category} from '../shared/models/category';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SERVER_URL} from '../../environments/environment';
import {Dish} from '../shared/models/dish';
import {CategoryStorageService} from './categoryStorage.service';
import {tap} from 'rxjs/operators';
import {CategoryService} from './category.service';
import {DishService} from './dish.service';
import {unwrapParentheses} from 'tslint';

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  constructor(private http: HttpClient,
              private categoryStorage: CategoryStorageService,
              private dishService: DishService) {
  }

  deleteCategory(categoryToDeleted: Category): Observable<{ message: string, category: Category }> {
    return this.http.delete<{ message: string, category: Category }>(`${SERVER_URL}categories/${categoryToDeleted._id}`);
  }

  addNewCategory(category: Category): Observable<{ message: string, category: Category }> {
    return this.http.post<{ message: string, category: Category }>(`${SERVER_URL}categories`, category);
  }

  deleteManyDish(currentCategory: Category): Observable<string> {
    return this.http.delete<string>(`${SERVER_URL}dishes/delete/${currentCategory._id}`);
  }

  deleteDish(dishId: string): Observable<{ message: string, dish: Dish }> {
    return this.http.delete<{ message: string, dish: Dish }>(`${SERVER_URL}dishes/${dishId}`);
  }

  addNewDish(dishToAdded: Dish, image?: File): Observable<Dish> {
    const body = this.addDataInFormData(dishToAdded, image);
    return this.http.post<Dish>(`${SERVER_URL}dishes`, body).pipe(
      tap(dish => {
        dish.img = this.dishService.createFullPathImageDish(dish.img);
      })
    );
  }

  updateDish(dishId: string, dish: Dish, image?: File): Observable<Dish> {
    const body = this.addDataInFormData(dish, image);
    return this.http.put<Dish>(`${SERVER_URL}dishes/${dishId}`, body).pipe(
      tap(updatedDish => {
        updatedDish.img = this.dishService.createFullPathImageDish(updatedDish.img);
      })
    );
  }

  updateCategory(categoryId: string, currentCategory: Category): Observable<{ message: string, category: Category }> {
    return this.http.put<{ message: string, category: Category }>(`${SERVER_URL}categories/${categoryId}`, currentCategory);
  }

  private addDataInFormData(dish: any, file?: File): FormData {
    const formData = new FormData();
    if (file) {
      formData.append('img', file, file.name);
    }
    formData.append('name', dish.name);
    formData.append('categoryId', dish.categoryCode);
    formData.append('rating', dish.rating);
    formData.append('weight', dish.weight);
    formData.append('price', dish.price);
    formData.append('composition', dish.composition);
    formData.append('description', dish.description);
    return formData;
  }
}
