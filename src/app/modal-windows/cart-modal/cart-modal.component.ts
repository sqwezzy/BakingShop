import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';


@Component({
  selector: 'ms-modal-window',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./modal-window.component.scss']
})
export class ModalWindowComponent implements OnInit {

  constructor(public modal: MatDialog) {

  }

  ngOnInit() {
}

closeModal() {
    this.modal.closeAll();
}
}
