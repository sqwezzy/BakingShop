import {Injectable} from '@angular/core';
import {Category} from '../models/category';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CategoryService} from './category.service';
import {Observable} from 'rxjs';
import {ResponseCategory} from '../models/responseCategory';
import {SERVER_URL} from '../../environments/constant';

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  constructor(private http: HttpClient,
              private categoryService: CategoryService) {
  }

  deleteCategory(categoryId: string): Observable<string> {
    return this.http.delete<string>(`${SERVER_URL}categories/` + categoryId);
  }

  addNewCategory(category: Category): Observable<ResponseCategory> {
    return this.http.post<ResponseCategory>(`${SERVER_URL}categories`, category);
  }

  deleteManyDish(currentCategory: Category): Observable<string> {
    return this.http.delete<string>(`${SERVER_URL}dishes/delete/${currentCategory.code}`);
  }

  deleteDish(dishId: string): Observable<string> {
    return this.http.delete<string>(`${SERVER_URL}dishes/${dishId}`);
  }

  addNewDish(name: string,
             categoryCode: string,
             composition: string,
             description: string,
             price: string,
             weight: string,
             rating: string,
             image?: File) {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    fd.append('categoryCode', categoryCode);
    fd.append('rating', rating);
    fd.append('weight', weight);
    fd.append('price', price);
    fd.append('composition', composition);
    fd.append('description', description);
    return this.http.post(`${SERVER_URL}dishes`, fd);
  }

  updateDish(dishId: string,
             name: string,
             categoryCode: string,
             composition: string,
             description: string,
             price: string,
             weight: string,
             rating: string,
             image?: File) {
    const fd = new FormData();
    if (image) {
      fd.append('image', image, image.name);
    }
    fd.append('name', name);
    fd.append('categoryCode', categoryCode);
    fd.append('rating', rating);
    fd.append('weight', weight);
    fd.append('price', price);
    fd.append('composition', composition);
    fd.append('description', description);
    return this.http.put(`${SERVER_URL}dishes/${dishId}`, fd);
  }
}
