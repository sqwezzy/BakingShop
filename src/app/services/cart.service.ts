import { Dish} from '../models/dish';
import {Injectable} from '@angular/core';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  dishesInCart: Dish[] = [];
  addDishToCart(currentDish: Dish) {
    this.dishesInCart.push(currentDish);
    sessionStorage.setItem('dish', JSON.stringify(this.dishesInCart));
  }

  getDishInCart(): Observable<Dish[]> {
    return of (JSON.parse(sessionStorage.getItem('dish')));
  }

  clearCart() {
    this.dishesInCart = JSON.parse(sessionStorage.getItem('dish'));
    this.dishesInCart = [];
    sessionStorage.removeItem('dish');
    return this.dishesInCart;
  }

  removeDishFromCart(dish: Dish) {
    this.dishesInCart = JSON.parse(sessionStorage.getItem('dish'));
    this.dishesInCart.splice(this.dishesInCart.indexOf(dish), 1);
    sessionStorage.setItem('dish', JSON.stringify(this.dishesInCart));
    return this.dishesInCart;
  }
  getCountDishInCart(): Observable<number> {
    this.getDishInCart().subscribe(dishes => this.dishesInCart = dishes);
    return of(this.dishesInCart.length);
  }

}
