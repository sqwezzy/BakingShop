import {Dish} from '../models/dish';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Category} from '../models/category';
import {HttpClient} from '@angular/common/http';




@Injectable({
  providedIn: 'root',
})

export class DishService {
  constructor(private http: HttpClient) {

  }

  getDishes(categories: Category[]): Observable<Dish[]> {
    const dishes = this.http.get<Dish[]>('http://localhost:9000/dishes');
    return dishes.pipe(map((Dishes: Dish[]) => {
      Dishes.map(dish => {
        dish.category = categories.find(category => category.code === dish.categoryCode);
      });
      return Dishes;
    }));
  }
}
