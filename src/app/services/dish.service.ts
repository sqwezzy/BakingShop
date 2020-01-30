import { Dish } from '../models/dish';
import Dishes from '../../assets/menu.json';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class DishService {
  getDishes(): Dish[] {
      return Dishes;
  }
}
