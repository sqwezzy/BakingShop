import {Dish} from '../Models/dish';
import Item from '../../assets/menu.json';

export class DishService {
  getItemMenu(): Promise<Dish[]> {
      return Item;
  }

  getItemByCategory(categoryName: string): Promise<Dish[]> {
    return Item.category;
  }
}