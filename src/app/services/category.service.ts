import {Categories} from '../Models/categories';
import categories from '../../assets/categories.json';

export class CategoryService {
  getCategoryList(): Promise<Categories[]> {
    return categories;
  }
}