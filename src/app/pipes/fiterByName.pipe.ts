import {Pipe} from '@angular/core';
import {Dish} from '../models/dish';

@Pipe({
  name: 'dishFilter',
})

export class FilterByNamePipe {
  transform(dishes: Dish[], searchInput: string): Dish[] {
    if (!dishes || !searchInput) {
      return dishes;
    }
    return dishes.filter(dishByCategory => dishByCategory.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
  }
}
