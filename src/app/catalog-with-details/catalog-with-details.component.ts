import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import {DishService} from '../services/dish.service';
import {Category} from '../models/category';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'ms-catalog-with-details',
  templateUrl: './catalog-with-details.component.html',
  styleUrls: ['./catalog-with-details.component.scss']
})
export class CatalogWithDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
