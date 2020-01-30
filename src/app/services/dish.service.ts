import { Dish } from '../models1/dish';
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
