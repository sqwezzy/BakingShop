import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RatingComponent} from '../rating/rating.component';
import {NgbRating} from '@ng-bootstrap/ng-bootstrap';
import {FilterByNamePipe} from '../pipes/fiterByName.pipe';
import {FilterByNameCategoryPipe} from '../pipes/filterByNameCategory.pipe';



@NgModule({
  declarations: [
    RatingComponent,
    NgbRating,
    FilterByNamePipe,
    FilterByNameCategoryPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RatingComponent,
    NgbRating,
    FilterByNamePipe,
    FilterByNameCategoryPipe,
  ]
})
export class SharedModule { }
