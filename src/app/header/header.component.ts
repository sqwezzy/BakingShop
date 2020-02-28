import {Component, OnInit} from '@angular/core';
import {CartService} from '../services/cart.service';
import { MatDialog } from '@angular/material';
import {ModalWindowComponent} from '../modal-window/modal-window.component';


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
    this.cartService.getCountDishInCart().subscribe( count => {
      this.countDishInCart = count;
    });
}

  openDialog() {
    this.modal.open(ModalWindowComponent);
  }
}

