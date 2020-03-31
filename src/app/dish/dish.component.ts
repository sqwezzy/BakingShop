import {Component, Input, OnInit} from '@angular/core';
import { Dish } from '../models/dish';
import {SERVER_URL} from '../../environments/constant';

@Component({
  selector: 'ms-item-menu',
  templateUrl: './item-menu.component.html',
  styleUrls: ['./item-menu.component.scss']
})
export class ItemMenuComponent implements OnInit {
  SERVER_URL = SERVER_URL;

  @Input()
  item: Dish;


  ngOnInit() {
  }
}
