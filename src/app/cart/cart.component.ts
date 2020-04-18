import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {Dish} from '../models/dish';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'ms-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  spinner: boolean;
  totalPrice = 0;
  dishesInCart: Dish[];

  constructor(private cartService: CartService) {

  }

  ngOnInit() {
    this.showSpinner();
    this.cartService.getDishInCart().subscribe(dishesInCart => {
      this.dishesInCart = dishesInCart;
      this.countTotalPrice();
      this.hideSpinner();
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.totalPrice = 0;
    this.dishesInCart = [];
  }

  countTotalPrice(): void {
    this.totalPrice = this.dishesInCart.reduce((total, dish) => total + dish.price, 0);
  }

  remoteDishFromCart(dish: Dish): void {
    this.dishesInCart = this.cartService.removeDishFromCart(dish);
    this.totalPrice -= dish.price;
  }

  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner(): void {
    this.spinner = false;
  }
}
