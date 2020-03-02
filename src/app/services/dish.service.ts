import {Dish} from '../models/dish';
import Dishes from '../../assets/menu.json';
import {Injectable} from '@angular/core';
import {Observable, of, pipe} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {Category} from '../models/category';
import {HttpClient} from "@angular/common/http";




@Injectable({
  providedIn: 'root',
})

export class DishService {
  dish: Dish;
  constructor(private http: HttpClient) {

  }

  getDishes(categories: Category[]): Observable<Dish[]> {
    let dishes = this.http.get<Dish[]>('http://localhost:9000/dishes');
    return dishes.pipe(map((Dishes: Dish[]) => {
      Dishes.map(dish => {
        dish.category = categories.find(category => category.code === dish.categoryCode);
      });
      return Dishes;
    }));
  }
}
