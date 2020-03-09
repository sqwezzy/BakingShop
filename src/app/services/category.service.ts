import { Category } from '../models/category';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  constructor(private http: HttpClient) {
  }
  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:9000/categories');
  }
}
