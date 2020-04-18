import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'ms-successful-checkout-modal',
  templateUrl: './successful-checkout-modal.component.html',
  styleUrls: ['./successful-checkout-modal.component.scss']
})
export class SuccessfulCheckoutModalComponent implements OnInit {

  constructor(private modal: MatDialog) { }

  ngOnInit() {
  }

  private closeModal() {
    this.modal.closeAll();
  }
}
