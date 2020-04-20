import {Dish} from '../shared/models/dish';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class BasketService {
  private countDishInBasketSubject = new BehaviorSubject<number>(0);
  countDishInBasket$ = this.countDishInBasketSubject.asObservable();
  dishesInCart: Dish[] = [];

  constructor() {
    this.dishesInCart = JSON.parse(localStorage.getItem('dish')) || [];
    this.countDishInBasketSubject.next(this.dishesInCart.length);
  }

  addDishToCart(currentDish: Dish) {
    this.dishesInCart.push(currentDish);
    localStorage.setItem('dish', JSON.stringify(this.dishesInCart));
    this.countDishInBasketSubject.next(this.dishesInCart.length);
  }

  getDishInCart() {
    return of(this.dishesInCart);
  }

  clearCart() {
    this.dishesInCart = [];
    localStorage.removeItem('dish');
    this.countDishInBasketSubject.next(this.dishesInCart.length);
  }

  removeDishFromCart(dish: Dish) {
    this.dishesInCart.splice(this.dishesInCart.indexOf(dish), 1);
    localStorage.setItem('dish', JSON.stringify(this.dishesInCart));
    this.countDishInBasketSubject.next(this.dishesInCart.length);
    return this.dishesInCart;
  }
}
