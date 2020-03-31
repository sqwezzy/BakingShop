import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {MatDialog} from '@angular/material';
import {CartModalComponent} from '../modal-windows/cart-modal/cart-modal.component';


@Component({
  selector: 'ms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  countDishInCart: number;

  constructor(private cartService: CartService, public modal: MatDialog) {

  }

  ngOnInit() {
    this.cartService.countDishInCart$.subscribe(count => {
      this.countDishInCart = count;
    });
  }

  openCart() {
    this.modal.open(CartModalComponent);
  }
}

