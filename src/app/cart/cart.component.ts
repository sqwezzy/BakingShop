import {Component, OnInit, Output} from '@angular/core';
import {CartService} from "../services/cart.service";
import {Dish} from "../models/dish";

@Component({
  selector: 'ms-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  dishesInCart: Dish[] ;

  constructor(private cartService: CartService) {

  }

  ngOnInit() {
    this.dishesInCart = this.cartService.getDishInCart();
  }

  clearCart() {
    this.cartService.clearCart();
    return this.dishesInCart.length = 0;
  }

}
