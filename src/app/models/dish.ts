import { Category } from './category';

export interface Dish {
  code: number;
  name: string;
  categoryCode: number;
  price: number;
  rating: number;
  img: string;
  category: Category;
}
