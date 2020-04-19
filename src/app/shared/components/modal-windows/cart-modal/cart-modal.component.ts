import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AuthService} from '../../../../services/auth.service';
import {CheckoutComponent} from '../checkout/checkout.component';


@Component({
  selector: 'ms-modal-window',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss']
})
export class CartModalComponent implements OnInit {

  constructor(public modal: MatDialog) {

  }

  ngOnInit() {
  }

  private closeModal() {
    this.modal.closeAll();
  }
}
