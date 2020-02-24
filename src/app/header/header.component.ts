import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CartService} from "../services/cart.service";

@Component({
  selector: 'ms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnChanges {
  countDishInCart: number;

  constructor(private cartService: CartService) {
      this.countDishInCart = this.cartService.getCountDishInCart();
  }

  ngOnInit() {
    this.countDishInCart = this.cartService.getCountDishInCart();
}

  ngOnChanges(changes: SimpleChanges): void {
    this.countDishInCart = this.cartService.getCountDishInCart();
  }
}

