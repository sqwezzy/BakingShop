import {Injectable} from '@angular/core';
import {Category} from '../models/category';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  constructor(private http: HttpClient) {
  }
  removeCtegory(categoryId: string) {
    return this.http.delete<Category[]>('http://localhost:9000/categories/' + categoryId);
  }
  addNewCategory(newCategory: Category) {
    return this.http.post<Category>('http://localhost:9000/categories/', newCategory);
  }
}
