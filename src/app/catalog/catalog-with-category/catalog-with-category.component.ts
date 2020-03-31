import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {DishService} from '../../services/dish.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Dish} from '../../models/dish';
import {Category} from '../../models/category';

@Component({
  selector: 'ms-catalog-with-category',
  templateUrl: './catalog-with-category.component.html',
  styleUrls: ['./catalog-with-category.component.scss']
})
export class CatalogWithCategoryComponent implements OnInit {
  dishes: Dish[];
  currentCategoryName: string;
  searchInput = '';
  categories: Category[];
  loading: boolean;

  constructor(private categoryService: CategoryService,
              private dishService: DishService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.loading = true;
      this.searchInput = '';
      this.currentCategoryName = params.get('categoryName');
      this.categoryService.getCategoryByName(params.get('categoryName')).subscribe(category => {
        this.dishService.getDishesByCategory(category).subscribe(dishes => {
          this.dishes = dishes;
          this.loading = false;
        });
      });
    });
  }

  showDetails(category: string, code: number) {
    this.router.navigate(['catalog', category, code]);
  }
}
