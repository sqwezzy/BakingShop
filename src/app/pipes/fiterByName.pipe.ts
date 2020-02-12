import {Pipe, PipeTransform} from '@angular/core';
import {Dish} from '../models/dish';

@Pipe({
  name: 'dishFilter'
})

export class FilterByNamePipe implements PipeTransform {
  transform(dishByCategory: Dish[], searchInput: string): any {
    if (!dishByCategory || !searchInput) {
      return dishByCategory;
    }
    return dishByCategory.filter(dishByCategory => dishByCategory.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
  }
}
