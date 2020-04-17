import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../models/dish';
import {SERVER_URL} from '../../environments/environment';

@Component({
  selector: 'ms-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  SERVER_URL = SERVER_URL;

  @Input()
  item: Dish;


  ngOnInit() {
  }
}
