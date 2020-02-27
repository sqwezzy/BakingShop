import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import {Dish} from '../models/dish';

@Component({
  selector: 'ms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  countDishInCart: number;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.getCountDishInCart().subscribe(count => {
      this.countDishInCart = count;
    });
}
}

