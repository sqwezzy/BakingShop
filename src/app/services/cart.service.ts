import { Dish} from '../models/dish';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CartStorageService {
  private countDishInCartSubject = new BehaviorSubject<number>(0);
  countDishInCart$ = this.countDishInCartSubject.asObservable();
  dishesInCart: Dish[] = [];

  constructor() {
    this.dishesInCart = JSON.parse(localStorage.getItem('dish')) || [];
    this.countDishInCartSubject.next(this.dishesInCart.length);
  }

  addDishToCart(currentDish: Dish) {
    this.dishesInCart.push(currentDish);
    localStorage.setItem('dish', JSON.stringify(this.dishesInCart));
    this.countDishInCartSubject.next(this.dishesInCart.length);
  }

  getDishInCart() {
    return of(this.dishesInCart);
  }

  clearCart() {
    this.dishesInCart = [];
    localStorage.removeItem('dish');
    this.countDishInCartSubject.next(this.dishesInCart.length);
  }

  removeDishFromCart(dish: Dish) {
    this.dishesInCart.splice(this.dishesInCart.indexOf(dish), 1);
    localStorage.setItem('dish', JSON.stringify(this.dishesInCart));
    this.countDishInCartSubject.next(this.dishesInCart.length);
    return this.dishesInCart;
  }
}
