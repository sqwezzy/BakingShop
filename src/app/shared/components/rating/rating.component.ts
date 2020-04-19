import {Component, Input, OnInit} from '@angular/core';
import {Dish} from '../../../models/dish';

@Component({
  selector: 'ms-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input('ratingValue') value: number;

  constructor() {
  }

  ngOnInit() {
  }

}
