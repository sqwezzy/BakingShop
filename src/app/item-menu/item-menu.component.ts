import { Component, Input, OnInit } from '@angular/core';
import { Dish } from '../models/dish';
import { Category } from '../models/category';

@Component({
  selector: 'ms-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit {

  @Input()
  item: Dish;

  ngOnInit() {
  }
}
