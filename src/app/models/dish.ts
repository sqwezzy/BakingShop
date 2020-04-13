import {Category} from './category';

export interface Dish {
  _id: string;
  name: string;
  categoryCode: number;
  price: number;
  rating: number;
  img: string;
  weight: number;
  composition: string;
  description: string;
  category: Category;
}
