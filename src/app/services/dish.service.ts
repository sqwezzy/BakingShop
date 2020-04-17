import {Dish} from '../models/dish';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Category} from '../models/category';
import {HttpClient} from '@angular/common/http';
import {SERVER_URL} from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})

export class DishService {

  constructor(private http: HttpClient) {
  }

  getDishes(categories: Category[]): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${SERVER_URL}dishes`).pipe(map((dishes: Dish[]) => {
      dishes.map(dish => {
        dish.category = categories.find(category => category._id === dish.categoryId);
        dish.img = this.createFullPathImageDish(dish.img);
      });
      return dishes;
    }));
  }

  getDishById(id: string, categories: Category[]): Observable<Dish> {
    return this.http.get<Dish>(`${SERVER_URL}dishes/${id}`).pipe(map((dish: Dish) => {
      dish.category = categories.find(category => category._id === dish.categoryId);
      dish.img = this.createFullPathImageDish(dish.img);
      return dish;
    }));
  }

  getDishesByCategory(currentCategory: Category): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${SERVER_URL}dishes`).pipe(map((dishes: Dish[]) => {
      dishes = dishes.filter(dish => dish.categoryId === currentCategory._id);
      dishes.map(dish => {
          dish.img = this.createFullPathImageDish(dish.img);
          dish.category = currentCategory;
        }
      );
      return dishes;
    }));
  }

  createFullPathImageDish(pathImg: string): string {
    return `${SERVER_URL}${pathImg}`;
  }
}
