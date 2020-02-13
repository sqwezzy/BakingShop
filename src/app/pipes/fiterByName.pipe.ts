import {Pipe, PipeTransform} from '@angular/core';
import {Dish} from '../models/dish';

@Pipe({
  name: 'dishFilter'
})

export class FilterByNamePipe implements PipeTransform {
  transform(dishes: Dish[], searchInput: string): any {
    if (!dishes || !searchInput) {
      return dishes;
    }
    return dishes.filter(dishByCategory => dishByCategory.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
  }
}
