import { Dish} from "../models/dish";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})

export class CartService {
  dishesInCart: Dish[] = [];

  addDishToCart(currentDish: Dish) {
    this.dishesInCart.push(currentDish);
    sessionStorage.setItem('dish',JSON.stringify(this.dishesInCart));
  }

  getDishInCart() {
    this.dishesInCart = JSON.parse(sessionStorage.getItem('dish'));
    console.log(this.dishesInCart);
  }

  clearCart() {
    this.dishesInCart = JSON.parse(sessionStorage.getItem('dish'));
    this.dishesInCart = [];
    sessionStorage.removeItem('dish');
    return this.dishesInCart;
  }

  removeDishFromCart(dish: Dish) {
    this.dishesInCart = JSON.parse(sessionStorage.getItem('dish'));
    this.dishesInCart.indexOf(dish);
    this.dishesInCart.splice(this.dishesInCart.indexOf(dish), 1);
  }

  getCountDishInCart() {
    return this.dishesInCart.length
  }

}
