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
  totalPrice: any = 0;
  dishesInCart: Dish[];

  constructor(private cartService: CartService) {

  }

  ngOnInit() {
    this.cartService.getDishInCart().pipe(delay(5000)).subscribe(dishesInCart => {
      this.dishesInCart = dishesInCart;
      this.countTotalPrice();
    });
  }

  clearCart() {
    this.cartService.clearCart();
    this.totalPrice = 0;
    this.dishesInCart = [];
  }

  countTotalPrice() {
    this.totalPrice = this.dishesInCart.reduce((total, dish) => total + dish.price, 0);
  }

  remoteDishFromCart(dish: Dish) {
    this.dishesInCart = this.cartService.removeDishFromCart(dish);
    this.totalPrice -= dish.price;
  }
}
