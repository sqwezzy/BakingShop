import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {Dish} from '../models/dish';
import {delay} from 'rxjs/operators';
import {CheckoutComponent} from '../modal-windows/checkout/checkout.component';
import {AuthService} from '../services/auth.service';
import {MatDialog} from '@angular/material';
import {SnackBarService} from '../services/snackBar.service';

@Component({
  selector: 'ms-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  spinner: boolean;
  totalPrice = 0;
  dishesInCart: Dish[];

  constructor(private cartService: CartService,
              private authService: AuthService,
              private modal: MatDialog,
              private snackBarService: SnackBarService) {

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

  private openCheckoutModel(): void {
    if (this.authService.isAuthenticated()) {
      const modalRef = this.modal.open(CheckoutComponent, {
        data: {
          dishes: this.dishesInCart, totalPrice: this.totalPrice,
        }
      });
      modalRef.afterClosed().subscribe(data => {
        this.dishesInCart = data.dishes;
        this.totalPrice = data.totalPrice;
      });
    } else {
      this.snackBarService.showSnackBar('Please, login');
    }
  }
}
