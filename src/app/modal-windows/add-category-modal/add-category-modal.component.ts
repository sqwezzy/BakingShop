import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'ms-add-category-modal',
  templateUrl: './add-category-modal.component.html',
  styleUrls: ['./add-category-modal.component.scss']
})
export class AddCategoryModalComponent implements OnInit {

  constructor(public modal: MatDialog) { }

  ngOnInit() {
  }
  closeModal() {
    this.modal.closeAll();
  }
}
