import {Dish} from '../models/dish';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {Category} from '../models/category';
import {HttpClient} from '@angular/common/http';
import {SERVER_URL} from '../../environments/constant';


@Injectable({
  providedIn: 'root',
})

export class DishService {

  constructor(private http: HttpClient) {
  }

  getDishes(categories: Category[]): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${SERVER_URL}dishes`).pipe(map((dishes: Dish[]) => {
      dishes.map(dish => {
        dish.category = categories.find(category => category.code === dish.categoryCode);
      });
      return dishes;
    }));
  }

  getDishById(id: string, categories: Category[]): Observable<Dish> {
    return this.http.get<Dish>(`${SERVER_URL}dishes/${id}`).pipe(map((dish: Dish) => {
      dish.category = categories.find(category => category.code === dish.categoryCode);
      return dish;
    }));
  }

  getDishesByCategory(currentCategory: Category): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${SERVER_URL}dishes`).pipe(delay(5000), map((Dishes: Dish[]) => {
      Dishes.map(dish => dish.category = currentCategory);
      return Dishes.filter(dish => dish.categoryCode === currentCategory.code);
    }));
  }
}
