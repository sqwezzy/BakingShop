import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';


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

  closeModal() {
    this.modal.closeAll();
  }
}
