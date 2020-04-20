import {Component, OnInit} from '@angular/core';
import {BasketService} from '../../../services/basket.service';
import {Dish} from '../../../models/dish';
import {delay} from 'rxjs/operators';
import {CheckoutComponent} from '../modal-windows/checkout/checkout.component';
import {AuthService} from '../../../services/auth.service';
import {MatDialog} from '@angular/material';
import {SnackBarService} from '../../../services/snackBar.service';
import {InternalServerPageComponent} from '../../../pages/error-pages/internal-server-page/internal-server-page.component';

@Component({
  selector: 'ms-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  spinner: boolean;
  totalPrice = 0;
  dishesInCart: Dish[];

  constructor(private basketService: BasketService,
              private authService: AuthService,
              private modal: MatDialog,
              private snackBarService: SnackBarService) {

  }

  ngOnInit() {
    this.showSpinner();
    this.basketService.getDishInCart().subscribe(dishesInCart => {
      this.dishesInCart = dishesInCart;
      this.countTotalPrice();
      this.hideSpinner();
    }, (error) => {
      if (error.status === 500) {
        this.modal.open(InternalServerPageComponent);
        return;
      }
      console.error();
    });
  }

  clearCart(): void {
    this.basketService.clearCart();
    this.totalPrice = 0;
    this.dishesInCart = [];
  }

  countTotalPrice(): void {
    this.totalPrice = this.dishesInCart.reduce((total, dish) => total + dish.price, 0);
  }

  remoteDishFromCart(dish: Dish): void {
    this.dishesInCart = this.basketService.removeDishFromCart(dish);
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
