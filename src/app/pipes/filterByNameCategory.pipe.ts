import {Pipe} from '@angular/core';
import {Category} from '../models/category';

@Pipe({
  name: 'categoryFilter',
})

export class FilterByNameCategoryPipe {
  transform(categories: Category[], searchInput: string): Category[] {
    if (!categories || !searchInput) {
      return categories;
    }
    return categories.filter(categoryByName => categoryByName.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
  }
}
