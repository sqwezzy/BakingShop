import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {AuthService} from '../../../../services/auth.service';
import {CheckoutComponent} from '../checkout/checkout.component';


@Component({
  selector: 'ms-modal-window',
  templateUrl: './basket-modal.component.html',
  styleUrls: ['./basket-modal.component.scss']
})
export class BasketModalComponent implements OnInit {

  constructor(public modal: MatDialog) {

  }

  ngOnInit() {
  }

  private closeModal() {
    this.modal.closeAll();
  }
}
