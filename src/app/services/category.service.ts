import { Category } from '../models/category';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  categories: Category[];
  constructor(private http: HttpClient) {
    this.initCategory();
  }
  getCategoryList(): Observable<Category[]> {
   if (this.categories && this.categories.length > 0) {
     return of([...this.categories]);
   } else if (!this.categories) {
     return this.http.get<Category[]>('http://localhost:9000/categories');
  }
  }
  private initCategory() {
    this.http.get<Category[]>('http://localhost:9000/categories').subscribe(categories => this.categories = categories);
  }
}
