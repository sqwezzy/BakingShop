import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {Dish} from '../models/dish';

@Component({
  selector: 'ms-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  totalPrice  = 0;
  dishesInCart: Dish[] ;

  constructor(private cartService: CartService) {

  }

  ngOnInit() {
    this.dishesInCart = this.cartService.getDishInCart();
    this.countTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
    this.totalPrice = 0;
    return this.dishesInCart.length = 0;
  }
  countTotalPrice() {
    for (let i = 0; i < this.dishesInCart.length; i++) {
       this.totalPrice += this.dishesInCart[i].price;
    }
  }
  remoteDish(dish) {
    this.cartService.removeDishFromCart(dish);
    console.log(dish);
    return this.dishesInCart = this.cartService.getDishInCart();
  }
}
