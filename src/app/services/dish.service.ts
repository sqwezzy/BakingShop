import { Dish } from '../models/dish';
import Dishes from '../../assets/menu.json';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DishService  {
  getDishes(): Observable <Dish[]> {
      return of (Dishes);
  }
}
