import {Injectable} from '@angular/core';
import {Category} from '../models/category';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AdminService {
  constructor(private http: HttpClient) {
  }

  removeCategory(categoryId: string) {
    return this.http.delete<Category[]>('http://localhost:9000/categories/' + categoryId);
  }

  addNewCategory(category: Category) {
    return this.http.post<Category>('http://localhost:9000/categories', category);
  }
}
