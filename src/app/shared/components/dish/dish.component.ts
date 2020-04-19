import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../../../models/dish';

@Component({
  selector: 'ms-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {

  @Input()
  item: Dish;


  ngOnInit() {
  }
}
