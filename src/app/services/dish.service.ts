import {Dish} from '../models/dish';
import Dishes from '../../assets/menu.json';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {Category} from '../models/category';




@Injectable({
  providedIn: 'root',
})

export class DishService {
  dish: Dish;

  getDishes(categories: Category[]): Observable<Dish[]> {
    return of(Dishes).pipe(delay(1000), map((Dishes: Dish[]) => {
      Dishes.map(dish => {
        dish.category = categories.find(category => category.id === dish.categoryId);
      });
      return Dishes;
    }));
  };
}
