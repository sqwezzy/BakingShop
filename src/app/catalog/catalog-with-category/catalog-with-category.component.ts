import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {DishService} from '../../services/dish.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Dish} from '../../models/dish';
import {Category} from '../../models/category';
import {delay, mergeMap, startWith, subscribeOn, switchMap, tap} from 'rxjs/operators';
import {noop} from 'rxjs';
import {__importDefault} from 'tslib';

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
  spinner: boolean;

  constructor(private categoryService: CategoryService,
              private dishService: DishService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.showSpinner();
      this.searchInput = '';
      this.currentCategoryName = params.get('categoryName');
      this.categoryService.getCategoryByName(this.currentCategoryName).pipe(
        switchMap(category => this.dishService.getDishesByCategory(category)),
        tap<Dish[]>(dishes => {
          this.dishes = dishes;
          this.hideSpinner();
        })
      ).subscribe(noop, console.error);
    });
  }

  showDetails(category: string, id: string): void {
    this.router.navigate(['catalog', category, id]);
  }

  private showSpinner(): void {
    this.spinner = true;
  }

  private hideSpinner(): void {
    this.spinner = false;
  }
}
