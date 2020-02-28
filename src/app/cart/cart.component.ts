import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {Dish} from '../models/dish';

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
     this.cartService.getDishInCart().subscribe(dishesInCart => {
       this.dishesInCart = dishesInCart;
     });
     this.countTotalPrice();
  }

  clearCart() {
    this.cartService.clearCart();
    this.totalPrice = 0;
    return this.dishesInCart.length = 0;
  }
  countTotalPrice() {
    this.totalPrice = 0;
    this.dishesInCart.map(dish => {
         this.totalPrice += dish.price;
    });
    return this.totalPrice;
  }
  remoteDish(dish: Dish) {
    this.dishesInCart = this.cartService.removeDishFromCart(dish);
    this.cartService.getCountDishInCart();
    this.totalPrice -= dish.price;
  }
}
