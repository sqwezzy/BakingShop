import { Dish} from '../models/dish';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  private countDishInCart = new BehaviorSubject<number>(0);
  countDishInCart$ = this.countDishInCart.asObservable();
  dishesInCart: Dish[] = [];

  addDishToCart(currentDish: Dish) {
    this.dishesInCart.push(currentDish);
    localStorage.setItem('dish', JSON.stringify(this.dishesInCart));
  }

  getDishInCart() {
    return of (JSON.parse(localStorage.getItem('dish')) || []);
  }

  clearCart() {
    this.dishesInCart = JSON.parse(localStorage.getItem('dish'));
    this.dishesInCart = [];
    localStorage.removeItem('dish');
    return this.dishesInCart;
  }

  removeDishFromCart(dish: Dish) {
    this.dishesInCart = JSON.parse(localStorage.getItem('dish'));
    this.dishesInCart.splice(this.dishesInCart.indexOf(dish), 1);
    localStorage.setItem('dish', JSON.stringify(this.dishesInCart));
    return this.dishesInCart;
  }
  getCountDishInCart() {
    this.dishesInCart = JSON.parse(localStorage.getItem('dish')) || [];
    this.countDishInCart.next(this.dishesInCart.length);
    return this.countDishInCart$;
  }

}
