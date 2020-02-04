import { Category } from '../models/category';
import categories from '../../assets/categories.json';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  getCategoryList(): Observable<Category[]> {
    return of (categories).pipe(delay(5000));
  }
}
