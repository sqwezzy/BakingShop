import { Category } from './category';

export interface Dish {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  rating: number;
  img: string;
  category: Category;
}
