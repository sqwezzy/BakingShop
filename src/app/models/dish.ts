import { Category } from './category';

export interface Dish {
  name: string;
  categoryId: number;
  price: number;
  rating: number;
  img: string;
}
