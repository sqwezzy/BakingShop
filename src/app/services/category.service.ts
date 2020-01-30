import { Category } from '../models1/category';
import categories from '../../assets/categories.json';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class CategoryService {
  getCategoryList(): Category[] {
    return categories;
  }
}
